import { Database } from 'sqlite3';
import { ProjectService } from '../src/projects/project.service';

describe('ProjectService', () => {
  let db: Database;
  let service: ProjectService;

  beforeEach(() => {
    db = new Database(':memory:');
    service = new ProjectService(db);
  });

  afterEach((done) => {
    db.close(() => done());
  });

  it('creates a project', async () => {
    const project = await service.create({
      name: 'Website redesign',
      team_id: 'team-1',
      status: 'draft',
    });

    expect(project).toMatchObject({
      name: 'Website redesign',
      team_id: 'team-1',
      status: 'draft',
    });
  });

  it('updates the project status', async () => {
    const project = await service.create({
      name: 'API migration',
      team_id: 'team-2',
      status: 'draft',
    });

    const updated = await service.updateStatus(project.id!, 'active');

    expect(updated).toMatchObject({
      id: project.id,
      status: 'active',
    });
  });

  it('gets projects by team', async () => {
    await service.create({ name: 'Project A', team_id: 'team-1', status: 'draft' });
    await service.create({ name: 'Project B', team_id: 'team-1', status: 'active' });
    await service.create({ name: 'Project C', team_id: 'team-2', status: 'archived' });

    const projects = await service.getByTeam('team-1');

    expect(projects).toHaveLength(2);
    expect(projects.every((project) => project.team_id === 'team-1')).toBe(true);
  });

  it('deletes a project', async () => {
    const project = await service.create({
      name: 'Legacy project',
      team_id: 'team-3',
      status: 'closed',
    });

    const deleted = await service.delete(project.id!);

    expect(deleted).toBe(true);
  });
});
