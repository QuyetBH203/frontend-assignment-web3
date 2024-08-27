import { useUser } from '../../setting/store/user'
import Footer from '../footer/Footer'
import './LayoutDefault.css'
import { Link, NavLink, Outlet } from 'react-router-dom'
function LayoutDefault() {
  const { clear } = useUser()

  const handleLogout = () => {
    clear() // Xóa token và các thông tin khác
    // Bạn có thể điều hướng người dùng đến trang đăng nhập hoặc trang chủ tại đây
  }
  return (
    <>
      <header className='header'>
        <div className='header-logo'>
          <Link to='/'>Logo</Link>
        </div>
        <div>
          <ul className='header-menu'>
            <li>
              <NavLink to='/'>Home</NavLink>
            </li>
            <li className='header-menu-item'>
              <NavLink to='/blog'>Blog</NavLink>
              <ul className='header-submenu'>
                <li>
                  <NavLink to='/blog/news'>Tin Tuc Moi</NavLink>
                </li>
                <li>
                  <NavLink to='/blog/relate'>Tin tuc lien quan</NavLink>
                </li>
              </ul>
            </li>
            <li>
              <button className='fill-white text-blue-100' onClick={handleLogout}>
                Logout
              </button>
            </li>
          </ul>
        </div>
      </header>
      <main className='main'>
        <Outlet />
      </main>

      <footer className='footer'>
        <Footer />
      </footer>
    </>
  )
}
export default LayoutDefault
