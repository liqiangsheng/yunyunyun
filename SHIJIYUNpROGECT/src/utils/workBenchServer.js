import store from '@/store'
let host;
if (window.location.href.indexOf('localhost') >= 0) {
    host = window._Host.BASE_API + window._Host.BASE_CONTEXT
} else {
    host = '/apis'
}

export const home = {
	getNumber:'/system/homepage/getNumbers',
	msgList:'/system/homepage/userMessages',
	readMsg:'/system/homepage/readMessage'
}

export const process = {
	list:'/workflow/api/v1/taskQuery/findApplyListByState',
	types:'/workflow/api/v1/taskQuery/processList'
}
