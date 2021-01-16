using System;

namespace Domain
{
    public class Value
    {   
        // get;set -- it means that this property can be getted or setted
        public int Id { get; set; } //Id named property automaticly will be used as pk (primary key)
        public int Name { get; set; }
    }
}
