import { Database } from 'sqlite3';
import { Project, ProjectStatus } from './project.model';

export class ProjectService {
  constructor(private db: Database) {
    this.init();
  }

  private init(): void {
    this.db.run(`
      CREATE TABLE IF NOT EXISTS projects (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        team_id TEXT NOT NULL,
        status TEXT NOT NULL,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP,
        updated_at TEXT DEFAULT CURRENT_TIMESTAMP
      )
    `);
  }

  create(project: Omit<Project, 'id' | 'created_at' | 'updated_at'>): Promise<Project> {
    return new Promise((resolve, reject) => {
      const { name, team_id, status } = project;

      this.db.run(
        `INSERT INTO projects (name, team_id, status) VALUES (?, ?, ?)`,
        [name, team_id, status],
        function (err) {
          if (err) {
            reject(err);
            return;
          }

          resolve({
            id: this.lastID,
            name,
            team_id,
            status,
          });
        }
      );
    });
  }

  updateStatus(id: number, status: ProjectStatus): Promise<Project | null> {
    return new Promise((resolve, reject) => {
      this.db.run(
        `UPDATE projects SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?`,
        [status, id],
        (err) => {
          if (err) {
            reject(err);
            return;
          }

          this.db.get(`SELECT * FROM projects WHERE id = ?`, [id], (getErr, row) => {
            if (getErr) {
              reject(getErr);
              return;
            }

            resolve((row as Project) || null);
          });
        }
      );
    });
  }

  getByTeam(team_id: string): Promise<Project[]> {
    return new Promise((resolve, reject) => {
      this.db.all(
        `SELECT * FROM projects WHERE team_id = ? ORDER BY created_at DESC`,
        [team_id],
        (err, rows) => {
          if (err) {
            reject(err);
            return;
          }

          resolve(rows as Project[]);
        }
      );
    });
  }

  delete(id: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.db.run(`DELETE FROM projects WHERE id = ?`, [id], (err) => {
        if (err) {
          reject(err);
          return;
        }

        resolve(true);
      });
    });
  }
}
