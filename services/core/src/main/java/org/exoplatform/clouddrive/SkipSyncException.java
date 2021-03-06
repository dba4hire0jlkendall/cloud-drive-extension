/*
 * Copyright (C) 2003-2012 eXo Platform SAS.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 */
package org.exoplatform.clouddrive;


/**
 * Synchronization should be skipped for current Cloud Drive resource. This means that the Cloud Drive allows
 * the resource (file, folder or its parts in local storage) not synchronized with remote cloud side without
 * affecting content consistency.<br>
 * 
 * Created by The eXo Platform SAS
 * 
 * @author <a href="mailto:pnedonosko@exoplatform.com">Peter Nedonosko</a>
 * @version $Id: SkipSyncException.java 00000 Apr 7, 2014 pnedonosko $
 * 
 */
public class SkipSyncException extends CloudDriveException {

  /**
   * 
   */
  private static final long serialVersionUID = -7053103350175153575L;

  /**
   * @param message
   */
  public SkipSyncException(String message) {
    super(message);
  }

}
