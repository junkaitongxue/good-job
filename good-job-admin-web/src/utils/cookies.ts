

export class cookies {
  static getCookie(name: string): any {
    const cookieString = document.cookie;
    const cookies = cookieString.split('; ');
    for (const cookie of cookies) {
      const [cookieName, cookieValue] = cookie.split('=');
      if (cookieName === name) {
        return cookieValue;
      }
    }
    return null;
  }

  // 删除cookie
  static delCookie(name: string) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = cookies.getCookie(name);
    if(cval!=null){
        document.cookie= name + '='+ cval + ';expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;';
    }
  }
}