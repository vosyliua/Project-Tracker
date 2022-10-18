using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Project
{
    public class Account
    {
        [Key]    //Account model, which is used to create Account objects                                                               
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string Username { get; set; } = "";
        public string Password { get; set; } = "";
    }
}
