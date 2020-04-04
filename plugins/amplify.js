import Vue from 'vue'
import Amplify, * as AmplifyModules from 'aws-amplify'
import { AmplifyPlugin, components } from 'aws-amplify-vue'
import aws_exports from '../../backend/src/aws-exports'
Amplify.configure(aws_exports)

Vue.use(AmplifyPlugin, AmplifyModules)

//register components individually for further use
// Do not import in .vue files
Vue.component('sign-in', components.SignIn)
