import React from 'react'
import PropTypes from 'prop-types'
import ExpandArrow from '../../icons/ExpandArrow.svg'
import './style.css'

const SideBar = ({ menu, activeMenu, goTo, expandMenu }) => (
  <aside className='left-aside'>
    <nav>
      <ul>
        { menu.map(({ image, name, nodes, expand, route }, i) =>
          <li key={i} className={(activeMenu === route ? 'active' : '')}>
            <a onClick={() => { if (nodes && nodes.length) { expandMenu(i) } else { goTo(route) } }} className={(nodes && expand ? 'expand' : '')}>
              <span>
                <img src={require(`../../icons/${image}`)} alt={name} />
                {name}
              </span>
              { nodes && <img className='expand-img' alt='' src={ExpandArrow} /> }
            </a>
            { expand && nodes && <ul> { nodes.map((node, j) => <li className={activeMenu === node.route ? 'active' : ''} key={j}><a onClick={() => goTo(node.route)}>
              {
                node.image &&
                  <img src={require(`../../icons/${node.image}`)} alt={node.name} />
              }
              {node.name}
            </a></li>) } </ul>}
          </li>
        ) }
      </ul>
    </nav>
  </aside>
)

SideBar.propTypes = {
  menu: PropTypes.arrayOf(PropTypes.object),
  activeMenu: PropTypes.string,
  goTo: PropTypes.func,
  expandMenu: PropTypes.func
}

SideBar.defaultProps = {
  menu: [],
  activeMenu: '',
  goTo: () => {},
  expandMenu: () => {}
}
export default SideBar
