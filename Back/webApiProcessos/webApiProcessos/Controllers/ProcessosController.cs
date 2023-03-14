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
using System.Diagnostics;

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
            var processos = Process.GetProcesses().Select(p => new Processos
            {
                Id = p.Id,
                Nome = p.ProcessName,
                Memoria = p.PrivateMemorySize64,
                //UsoCPUPorcentagem = Math.Round((p.TotalProcessorTime.TotalMilliseconds / Environment.TickCount) * 100, 2)

            }).ToList();

            return Ok(processos);
        }
    }
}
