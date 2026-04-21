using System.ComponentModel.DataAnnotations;

namespace BusBookingAPI.Models
{
    public class Bus
    {
        public int Id { get; set; }

        [Required]
        public string BusName { get; set; } = string.Empty;

        [Required]
        public string FromCity { get; set; } = string.Empty;

        [Required]
        public string ToCity { get; set; } = string.Empty;

        [Required]
        public string DepartureTime { get; set; } = string.Empty;

        [Required]
        public string ArrivalTime { get; set; } = string.Empty;

        [Range(1, 100000)]
        public decimal Price { get; set; }

        [Range(1, 100)]
        public int TotalSeats { get; set; }
    }
}