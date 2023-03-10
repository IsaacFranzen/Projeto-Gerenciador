using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using webApiProcessos.Model;

namespace webApiProcessos.Data
{
    public class webApiProcessosContext : DbContext
    {
        public webApiProcessosContext (DbContextOptions<webApiProcessosContext> options)
            : base(options)
        {
        }

        public DbSet<webApiProcessos.Model.Processos> Processos { get; set; } = default!;
    }
}
