using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using NotesApi.Models;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace NotesApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class NotesController : ControllerBase
    {
        private IMemoryCache _cache;

        public NotesController(IMemoryCache memoryCache)
        {
            _cache = memoryCache;
        }

        //You should be able to get a list of all notes.
        [HttpGet]
        public IEnumerable<NoteModel> GetNotes()
        {
            if (!_cache.TryGetValue("CachedNotes", out List<NoteModel> notes))
            {
                notes = new List<NoteModel>();
            }
            return notes.OrderBy(x => x.Id);
        }

        //You should be able to get a specific note.
        [HttpGet("{Id}")]
        public NoteModel GetNote(int Id)
        {
            if (!_cache.TryGetValue("CachedNotes", out List<NoteModel> notes))
            {
                notes = new List<NoteModel>();
            }
            return notes.Where(x => x.Id == Id).FirstOrDefault();
        }

        //You should be able to add a note.
        [HttpPost]
        public void CreateNote([FromBody] string note)
        {
            if (note == null)
            {
                BadRequest();
            }
            List<NoteModel> notes = GetNotes().ToList();
            notes.Add(new NoteModel()
            {
                Id = notes.Count > 0 ? notes.OrderByDescending(x => x.Id).FirstOrDefault().Id + 1 : 0,
                Note = note
            });
            _cache.Set<List<NoteModel>>("CachedNotes", notes);
            Ok();
        }

        //You should be able to edit a note.
        [HttpPut("{Id}")]
        public void UpdateNote([FromBody] string note, int Id)
        {
            if (note == null)
            {
                BadRequest();
            }
            List<NoteModel> notes = GetNotes().ToList();
            NoteModel editNote = notes.Where(x => x.Id == Id).FirstOrDefault();
            notes.Remove(editNote);
            editNote.Note = note;
            notes.Add(editNote);
            _cache.Set<List<NoteModel>>("CachedNotes", notes);
            Ok();
        }

        //You should be able to delete a note.
        [HttpDelete("{Id}")]
        public void DeleteNote(int Id)
        {
            List<NoteModel> notes = GetNotes().ToList();
            NoteModel deleteNote = notes.Where(x => x.Id == Id).FirstOrDefault();
            notes.Remove(deleteNote);
            _cache.Set("CachedNotes", notes);
            Ok();
        }
    }
}