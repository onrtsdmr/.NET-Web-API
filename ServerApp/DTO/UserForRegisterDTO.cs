using System.ComponentModel.DataAnnotations;

namespace ServerApp.DTO {
    public class UserForRegisterDTO {
        [Required(ErrorMessage="Name is required.")]
        [StringLength(50), MinLength(3)]
        public string Name { get; set; }
        [Required]
        public string UserName { get; set; }
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        public string Gender { get; set; }
        [Required]
        public string Password { get; set; }
    }
}
