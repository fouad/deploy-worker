import { startCloudflareWorker } from 'trustless-worker'
import jsonPolicies from './test-policies.json'

let Policies = [...jsonPolicies] //, ...yamlPolicies]

console.log(Policies)

startCloudflareWorker({ Policies })
