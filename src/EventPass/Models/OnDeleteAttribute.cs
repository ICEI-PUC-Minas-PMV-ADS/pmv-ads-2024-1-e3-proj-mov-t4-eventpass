using Microsoft.EntityFrameworkCore;

namespace EventPass.Models
{
    internal class OnDeleteAttribute : Attribute
    {
        public OnDeleteAttribute(DeleteBehavior noAction)
        {
            NoAction = noAction;
        }

        public DeleteBehavior NoAction { get; }
    }
}