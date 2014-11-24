/**
 * CMIS support for eXo Cloud Drive.
 * 
 */
(function($, cloudDrive, utils, codeMirror) {

	/**
	 * CMIS connector class.
	 */
	function CMIS() {

		/**
		 * Initialize CMIS client on its load on the page (or the page fragment update).
		 */
		this.onLoad = function(provider) {
			// Add an action to "show plain text" tab to load the frame content to the code viewer
			$(function() {
				var $viewer = $("#WebContent");
				var $code = $viewer.find("#TabCode");

				function createViewer(codeURL) {
					var cursorCss = $viewer.css("cursor");
					$viewer.css("cursor", "wait");

					// TODO use context file for url if it is null?
					var contextFile = cloudDrive.getContextFile();
					utils.log("contextFile: " + contextFile.path + " " + contextFile.typeMode);
					if (!codeURL && contextFile) {
						codeURL = contextFile.previewLink;
					}

					$.get(codeURL, function(data, status, jqXHR) {
						try {
							var code = jqXHR.responseText;
							var codeMode = jqXHR.getResponseHeader("x-type-mode");
							if (!codeMode) {
								var contentType = jqXHR.getResponseHeader("Content-Type");
								if (contentType) {
									codeMode = contentType;
								} else {
									codeMode = "htmlmixed";
								}
							}
							var codeMirror = CodeMirror($code.get(0), {
							  value : code,
							  lineNumbers : true,
							  readOnly : true,
							  mode : codeMode
							});
						} catch(e) {
							utils.log("ERROR: CodeMirror creaton error " + provider.name + "(" + provider.id + "). " + e.message + ": "
							    + JSON.stringify(e));
						} finally {
							$viewer.css("cursor", cursorCss);
						}
					});
				}

				var $codeSwitch = $("#FileCodeSwitch");
				$codeSwitch.click(function() {
					if ($code.size() > 0 && $code.children().size() == 0) {
						var codeURL = $viewer.find("iframe").attr("src");
						createViewer(codeURL);
					}
				});

				if ($code.is(".active")) {
					// it is XML document, click to load its content
					$codeSwitch.click();
					$viewer.find("#TabHTML").css("display", "");
				} else if ($code.is(":visible")) {
					createViewer(null);
				}

				// XXX remove display: block, it appears for unknown reason
				$code.css("display", "");
			});
		};
	}

	if (window == top) { // run only in window (not in iframe as gadgets may do)
		try {
			// load codemirror styles
			utils.loadStyle("/cloud-drive-cmis/skin/codemirror.css");
		} catch(e) {
			utils.log("Error intializing CMIS client.", e);
		}
	}

	return new CMIS();
})($, cloudDrive, cloudDriveUtils, codeMirror);
