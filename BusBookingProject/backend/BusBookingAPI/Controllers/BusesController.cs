using BusBookingAPI.Data;
using BusBookingAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BusBookingAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BusesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public BusesController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Bus>>> GetBuses()
        {
            var buses = await _context.Buses.ToListAsync();
            return Ok(buses);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Bus>> GetBus(int id)
        {
            var bus = await _context.Buses.FindAsync(id);

            if (bus == null)
            {
                return NotFound(new { message = "Bus not found" });
            }

            return Ok(bus);
        }

        [HttpGet("search")]
        public async Task<ActionResult<IEnumerable<Bus>>> SearchBuses([FromQuery] string fromCity, [FromQuery] string toCity)
        {
            if (string.IsNullOrWhiteSpace(fromCity) || string.IsNullOrWhiteSpace(toCity))
            {
                return BadRequest(new { message = "fromCity and toCity are required" });
            }

            var buses = await _context.Buses
                .Where(b => b.FromCity.ToLower() == fromCity.ToLower() &&
                            b.ToCity.ToLower() == toCity.ToLower())
                .ToListAsync();

            return Ok(buses);
        }

        [HttpPost]
        public async Task<ActionResult<Bus>> AddBus(Bus bus)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Buses.Add(bus);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetBus), new { id = bus.Id }, bus);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateBus(int id, Bus bus)
        {
            if (id != bus.Id)
            {
                return BadRequest(new { message = "Bus ID mismatch" });
            }

            var existingBus = await _context.Buses.FindAsync(id);

            if (existingBus == null)
            {
                return NotFound(new { message = "Bus not found" });
            }

            existingBus.BusName = bus.BusName;
            existingBus.FromCity = bus.FromCity;
            existingBus.ToCity = bus.ToCity;
            existingBus.DepartureTime = bus.DepartureTime;
            existingBus.ArrivalTime = bus.ArrivalTime;
            existingBus.Price = bus.Price;
            existingBus.TotalSeats = bus.TotalSeats;

            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBus(int id)
        {
            var bus = await _context.Buses.FindAsync(id);

            if (bus == null)
            {
                return NotFound(new { message = "Bus not found" });
            }

            _context.Buses.Remove(bus);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}