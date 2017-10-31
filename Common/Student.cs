/*   Copyright 2017 Matthew Ford <matthew@matthewford.us>
**
**   Licensed under the Apache License, Version 2.0 (the "License");
**   you may not use this file except in compliance with the License.
**   You may obtain a copy of the License at
**
**     http://www.apache.org/licenses/LICENSE-2.0
**
**   Unless required by applicable law or agreed to in writing, software
**   distributed under the License is distributed on an "AS IS" BASIS,
**   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
**   See the License for the specific language governing permissions and
**   limitations under the License.
*/

using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Runtime.Serialization;

namespace MatthewFordUs.NextApp.Common {
  [DataContract]
  public class Student : IIdentifiable {
    [DataMember(Name = "id")]
    [Key]
    public Guid? Id { get; set; }

    public Guid? ETag { get; set; }
    public DateTime EnteredTimestamp { get; set; }
    public DateTime SupersededTimestamp { get; set; }
    
    [DataMember(Name = "givenName")]
    public string GivenName { get; set; }

    [DataMember(Name = "surname")]
    public string Surname { get; set; }

    //public LocalDate BirthDate { get; set; }
    // public ICollection<Class> Classes;
  }
}
