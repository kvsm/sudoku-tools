import test from 'ava'
import sinon from 'sinon'
import {solve, funcs} from '../src/solve'
import {validIncompletePuzzle, validCompletePuzzle} from './fixtures'

test.afterEach.always(t => {
  funcs.runAlgorithms.restore()
})

test.serial('solve - rejected', t => {
  sinon.stub(funcs, 'runAlgorithms').returnsArg(0)
  return solve(validIncompletePuzzle).then(result => {
    t.fail('promise is rejected when runAlgorithms does not modify state')
  }).catch(result => {
    t.pass('promise is rejected when runAlgorithms does not modify state')
  })
})

test.serial('solve - resolved', t => {
  sinon.stub(funcs, 'runAlgorithms').returns(validCompletePuzzle)
  return solve(validIncompletePuzzle).then(result => {
    t.pass('promise is resolved when runAlgorithms returns complete puzzle')
  }).catch(result => {
    t.fail('promise is resolved when runAlgorithms returns complete puzzle')
  })
})
