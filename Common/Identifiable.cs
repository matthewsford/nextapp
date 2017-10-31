using System;

namespace MatthewFordUs.NextApp.Common {
  public interface IIdentifiable {
    Guid? Id { get; set; }
    Guid? ETag { get; set; }
    DateTime EnteredTimestamp { get; set; }
    DateTime SupersededTimestamp { get; set; }
  }
}
