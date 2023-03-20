import {List, ListItem} from "@mui/material";
import {useLocation, useNavigate, useNavigation} from "react-router-dom";
import { NavLink }from 'react-router-dom'
type ISubMenuList = {
  text:string,
  url: string
}
type IMenuList = {
  ['url']: ISubMenuList[]
}
const MenuComponent = () => {
  // const menuList = {
  //   dashboard: [
  //     {
  //       text: '매출',
  //       url: '/dashboard'
  //     },
  //     {
  //       text: '시스템',
  //       url: '/dashboard/system'
  //     },
  //   ],
  //   revenue: [
  //     {
  //       text:'매출/건수',
  //       url: '/revenue'
  //     },
  //     {
  //       text:'판매수량',
  //       url: '/revenue/quantity'
  //     },
  //   ],
  //   store: [
  //     {
  //       text:'상세정보',
  //       url: '/store'
  //     },
  //     {
  //       text:'수정',
  //       url: '/store/revise'
  //     },
  //   ],
  //   facility: [
  //     {
  //       text:'상세정보',
  //       url: '/facility'
  //     },
  //     {
  //       text:'등록',
  //       url: '/facility/register'
  //     },
  //     {
  //       text:'수정/삭제',
  //       url: '/facility/revise'
  //     },
  //     {
  //       text:'모션',
  //       url: '/facility/motion'
  //     },
  //     {
  //       text:'코드관리',
  //       url: '/facility/code'
  //     },
  //   ],
  //   header: [
  //     {
  //       text:'메뉴',
  //       url: '/header'
  //     },
  //     {
  //       text:'레시피',
  //       url: '/header/recipe'
  //     },
  //     {
  //       text:'품목',
  //       url: '/header/category'
  //     },
  //   ],
  //   platform: [
  //     {
  //       text:'플랫폼',
  //       url: '/platform'
  //     },
  //     {
  //       text:'주문조회',
  //       url: '/platform/order'
  //     },
  //     {
  //       text:'테스트',
  //       url: '/platform/test'
  //     }
  //   ],
  //   notice: [
  //     {
  //       text:'상세정보',
  //       url: '/notice'
  //     },
  //     {
  //       text:'등록',
  //       url: '/notice/register'
  //     },
  //     {
  //       text:'수정/삭제',
  //       url: '/notice/revise'
  //     },
  //   ],
  //   setting: [
  //     {
  //       text:'사용자/지점',
  //       url: '/setting'
  //     },
  //     {
  //       text:'그룹',
  //       url: '/setting/group'
  //     },
  //     {
  //       text:'권한관리',
  //       url: '/setting/auth'
  //     },
  //   ]
  // }
  const menuList = {
    sales: {
      txt: '메인',
      url: '/'
    },
    quantity: {
      txt: '판매수량',
      url: '/branch'
    }
  }
  const location = useLocation().pathname.split('/')[1]
  console.log(location)
  return <>
  <List>

    { Object.values(menuList).map(list => (
      <NavLink to={list.url}>
        <ListItem key={`list_${list.txt}`}>
          {list.txt}
        </ListItem>
      </NavLink>
    ))}
  </List>
  </>
}
export default MenuComponent