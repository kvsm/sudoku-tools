import test from 'ava'
import api from '../src/index'

test('api', t => {
  t.true(api.parse instanceof Function, 'parse function is exported')
  t.true(api.solve instanceof Function, 'solve function is exported')
})
