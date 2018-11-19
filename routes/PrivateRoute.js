import { Route } from 'react-router-dom';

export default (args) => {
  const { render, ...rest } = args;
  function bloom(a,b) {
    for(let i = 0;i < JSON.parse(a).length;i++){
      if(a[i].indexOf(b.substring(1,b.length-1))){
        return true
      }
    }
  }
  const urls = sessionStorage.getItem("urls").toLowerCase();
  return <Route
    {...rest}
    render={props =>
      <div>
        {/*<div>PrivateRoute (routes/PrivateRoute.js)</div>*/}
        {
          // 拿到需要申请通过的路由
          console.log("当前要访问的页面："+JSON.stringify(props.match.path.substring(0,props.match.path.length-1)))
          // 遍历现有的菜单列表，如果匹配为true，则展示页面
        }
        {console.log("用户拥有的urls："+sessionStorage.getItem("urls").toLowerCase())}

        {
          bloom(urls,props.match.path)?render(props):<div>你没有权限访问！</div>
        }
        {/*{*/}
          {/*JSON.parse(sessionStorage.getItem("urls").toLowerCase()).forEach(url=>{*/}
            {/*console.log(url+"::::"+props.match.path.substring(0,props.match.path.length-1))*/}
            {/*// let reg = new RegExp(url.substring(1,url.length-1));*/}
            {/*try{*/}
              {/*console.log(url.indexOf(props.match.path.substring(1,props.match.path.length-1)))*/}
            {/*if(url.indexOf(props.match.path.substring(1,props.match.path.length-1))>= 0) {*/}
              {/*render(props)*/}
              {/*throw new Error("ending");//报错，就跳出循环*/}
            {/*}}catch(e) {*/}
              {/*if(e === "ending")return;*/}

            {/*else throw e;*/}
            {/*}*/}
          {/*})*/}
        {/*}*/}
      </div>
    }
  />;
}
