import { dbQuery } from '../db.js';

export class NoteController {
  async listAll(req, res) {
    /*try {*/
      const sql = `
        SELECT notes.*, categories.name AS category_name 
        FROM notes 
        LEFT JOIN categories ON notes.category_id = categories.id
      `;
      const [results, fields] = await dbQuery(sql);
      res.send(results);
      console.log(results);
    }
      // Преобразуем результаты, чтобы включить category_name в каждую заметку
     /* const notesWithCategory = results.map(note => {
        return {
          id: note.id,
          text: note.text,
          category_name: note.category_name // Добавляем category_name
        };
      });
      
      res.send(notesWithCategory);
    } catch (error) {
      console.error('Ошибка при получении списка заметок:', error);
      res.status(500).json({ error: 'Внутренняя ошибка сервера' });
    }
  }*/
  
  /*async listAll(req, res) {
    console.log('noteController should list them all');
    const [results, fields] = await dbQuery('SELECT * FROM notes');
    res.send(results);
  }*/

  async create(req, res) {
    try {
      const newNote = {
        text: req.body.text
      };
      console.log('noteController create with text : ', newNote.text);
      const [results, fields] = await dbQuery('INSERT INTO notes (text) VALUE (?)', [newNote.text]);
      res.json({ message: "note added", results: results });
    } catch (error) {
      console.error('Error creating note:', error);
      res.status(500).json({ error: 'Failed to create note' });
    }
  }
  /*async create(req, res) {
    const newNote = {
      text: req.body.text
    };
    console.log('noteController create with text : ', newNote.text);
    const [results, fields] = await dbQuery('INSERT INTO notes (text) VALUE (?)', [newNote.text]);
    res.json({message: "note added", results: results});
  }*/

  async update(req, res) {
    const [results] = await dbQuery('UPDATE notes SET text = ? WHERE id= ?', [req.body.text, req.params.id]);
    res.json({ message: "note updated", results: results});
  }

  async destroy(req, res) {
    const [results, fields] = await dbQuery('DELETE FROM notes WHERE id = ?', [req.params.id]);
    res.json({message: "note deleted",  results: results});
  }
}
