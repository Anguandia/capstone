import request from 'supertest';
import app from '../app.js';
import regeneratorRuntime from 'regenerator-runtime';
import { addNums } from '../src/controllers/users';
import * as auth from '../src/helpers/token.js';


describe('test general addition', () => {
  it('should correctly add 2 numbers', () => {
    const sum = addNums(5, 9);
    expect(sum).toEqual(14);
  })
  it('should add negative numbers correctly', function () {
    const diff = addNums(5, -9);
    expect(diff).toEqual(-4);
  })
})

describe('signup tests', () => {
  jest.useFakeTimers();
  it('should successfully create a new user', async () => {
    const resp = await request(app)
      .post('/signup')
      .send({ name: 'cohort 3', email: 'cohort3@mail.com', password: '' });
    expect(resp.statusCode).toEqual(201);
    expect(resp.body).toHaveProperty('token');
    expect(resp.body.user.name).toBe('cohort 3');
  })
  it('should not signup a user with missing email', async () => {
    const res = await request(app)
      .post('/signup')
      .send({ name: '', email: 'abc@hjhk' });
    expect(res.status).toBe(400);
    expect(res.body.message).toEqual('full name needed')
  })
  it('should not signup a user with missing email', async () => {
    const res = await request(app)
      .post('/signup')
      .send({ name: 'lu hi', email: 'abc@hjhk' });
    expect(res.status).toBe(400);
    expect(res.body.message).toEqual('name too short')
  })
})

describe('login tests', () => {
  it('successful login', async () => {
    const generateTokenSpy = jest.spyOn(auth, 'generateToken');
    const fakeToken = 'hhlgjjkhsfklsdkgljdm.fklbjhkll;mkkjnk.';
    auth.generateToken.mockReturnValue(fakeToken);
    const resp = await request(app)
      .post('/login')
      .send({ name: 'cohort 3' });
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toHaveProperty('token');
    expect(resp.body.token).toEqual(fakeToken);
  })
})

describe('it should create a blog', () => {
  const testUser = { name: 'tets user', email: 'test@MediaList.com' };
  beforeEach(async() => {
    await request(app)
      .post('/signup')
      .send(testUser);
    // .end();
  })
  const authorization = auth.generateToken(testUser)
  it('should create blog', async () => {
    const res = await request(app)
      .post('/blogs')
      .set({ authorization: `bearer ${authorization}` })
      .send({ title: 'test title', body: 'test body' });
    expect(res.status).toBe(201);
    expect(res.body.message).toEqual('blog created')
    expect(res.body.post.title).toEqual('test title')
  })
})

