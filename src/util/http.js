import axios from 'axios'

axios.defaults.timeout = 5000
axios.defaults.baseURL = ""

//http request拦截器

// axios.interceptors.request.use(
//   (config)=>{
//   const token = getCookie('session')
//   config.data = JSON.stringify(config.data)

//   config.header = {
//     'Content-Type':'application/x-www-form-urlencoded'
//   }
//   if(token){
//     config.params = {'token':token}
//   }
//   return config
// },
//   (err)=>{
//     return Promise.reject(err)
//   }
// )

// //http response拦截器
// axios.interceptors.response.use(
//   (response)=>{
//     if(response.data.errCode == 2){
//       router.push({
//         path: '/Login',
//         query: {redirect: router.currentRoute.fullPath}
//       })
//     }
//     return response
//   },
//   (error)=>{
//     return Promise.reject(error.response.data)
//   })

  //封装axios的方法

  export function get(url, params = {}){
    return new Promise((resolve,reject)=>{
      axios.get(url,{
        params: params
      }).then(response =>{
        resolve(response.data)
      }).catch(err =>{
        reject(err)
      })
    })
  }

  function createTag(url){
    const script = document.createElement("script")
    script.setAttribute("type","text/javascript")
    script.src = url
    document.body.appendChild(script)
  }

  //设置跨域请求
   export function crossOrigin(){
     const base = "https://bird.ioliu.cn/v1/url="

     return new Promise((resolve,reject) =>{
      axios.get(base+"http://music.163.com/api/playlist/detail?id=19723756")
      .then(res=>{
        console.log("success")
          resolve(res.data)
        }).catch(err=>{
          console.log("error")
          reject(err)
        })
      })
   }


  export function post(url, data = {}){
    return new Promise((resolve,reject)=>{
      axios.post(url,data)
    }).then(response=>{
      resolve(response.data)
    }).catch(err =>{
      reject(err)
    })
  }

