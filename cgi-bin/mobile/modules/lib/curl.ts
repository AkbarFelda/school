// noPage

import { LibCrypt } from 'esoftplay/cache/lib/crypt/import';
import { LibNavigation } from 'esoftplay/cache/lib/navigation/import';
import { LibToastProperty } from 'esoftplay/cache/lib/toast/import';
import { LibUtils } from 'esoftplay/cache/lib/utils/import';
import { UserClass } from 'esoftplay/cache/user/class/import';
import esp from 'esoftplay/esp';
import useGlobalState from 'esoftplay/global';
import LibCurl from 'esoftplay/modules/lib/curl';


const cache = useGlobalState(false)
export default class m extends LibCurl {

  async setHeader(): Promise<void> {
    const data = UserClass.state().get()??''
    this.header['Content-Type'] = 'application/json'
    this.header['Accept'] = 'application/json'
    let apikey: string = String(data.apikey)??''
    // console.log(typeof data.ata.apikey)
    const config = esp.config();
    const crypt = new LibCrypt()
    if ((/:\/\/data.*?\/(.*)/g).test(this.url)) {
      this.header['masterkey'] = crypt.encode(this.url)
    }
    let dt = UserClass.state().get()
    let token = this.getTimeByTimeZone(config.timezone) + ''
    // let token =  dt.id
    if (data) {
      //   this.setApiKey(dt.id)
      token += "|" + apikey
      console.log("time", this.getTimeByTimeZone(config.timezone))
      console.log("apikey :", apikey)
      console.log("token => time|apikey:", this.getTimeByTimeZone(config.timezone) + "|" + apikey)
      console.log("token :",crypt.encode(token))
      
    } else {
      // this.setApiKey('0')
      token += "|" + 0
      token += "|" + 0
      
    }
    
    this.header['token'] = crypt.encode(token)
    // this.header['token'] = 'TldZM04ySmxNVEZsTjJaaFkyRTVNUT09NXJvUXU2ZlVMblRwK3p5b2xjRFlNUTRzWVN4RllIOGlZa2FqQlA1US9Tb1phUzlNbjZJVzVxUi9nOW5DcjhrcVNUZkwwemVocFlzbjFpYkVnRTM2V0E9PQ=='
    //  console.log(data.apikey)
    // this.header= {
    // token: token,
    // }
    
  }
  doLogout = false
  

  onStatusCode(ok: number, status_code: number, message: string, result: any): boolean {
    if (status_code == 440 && UserClass.state().get().id && !cache.get()) {
      cache.set(true)
      LibUtils.debounce(() => UserClass.delete().then(() => {
        LibNavigation.reset(esp.config('home', 'public'), 'auth/login')
        LibToastProperty.show(message)
        LibUtils.debounce(() => { cache.set(false) }, 1000)
      }), 1000)
      return false
    }
    return super.onStatusCode(ok, status_code, message, result)
  }
}
