export function speedToProgress(speed:number){//这是播放速度到界面速度条进度的对应函数，为保证 0=》0 1=》10的效果，成指数关系，比较符合人们感知
  return Math.log10(speed*9+10)-1
}
export function progressToSpeed(progress:number){//这是播放速度到界面速度条进度的对应函数，为保证 0=》0 1=》10的效果，成指数关系，比较符合人们感知
  return (Math.pow(10,progress+1)-10)/9
}