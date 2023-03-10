using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using webApiProcessos.Data;
using webApiProcessos.Model;

namespace webApiProcessos.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ProcessController : ControllerBase
    {
        [HttpGet]
        [EnableCors]
        public IActionResult GetProcessList()
        {
            var processes = System.Diagnostics.Process.GetProcesses().Select(p => new Processos
            {
                Id = p.Id,
                Nome = p.ProcessName,
                Título = p.MainWindowTitle,
                Memória = p.PrivateMemorySize64
            }).ToList();

            return Ok(processes);
        }
    }
}
