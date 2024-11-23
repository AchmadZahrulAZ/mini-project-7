import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Sidebar = ({ showSidebar, onClick }) => {
  const [activeLink, setActiveLink] = useState('');
  const navLinks = [
    {
      name: 'Create Product',
      link: '/createproduct',
    },
    {
      name: 'Edit Product',
      link: '/editproduct',
    },
    {
      name: 'Logs List',
      link: '/logslist',
    },
    {
      name: 'Product List',
      link: '/productlist',
    },
    {
      name: 'Stock In',
      link: '/stockin',
    },
    {
      name: 'Stock Out',
      link: '/stockout',
    },
  ];

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  const resetLinkClick = () => {
    setActiveLink('');
  };

  return (
    <div className={`${showSidebar ? 'flex z-10' : 'hidden'} lg:flex flex-col left-0 lg:w-56`}>
      <div className={`fixed flex backdrop-blur-sm ${showSidebar && 'bg-darkblue/[.3] w-full'} h-screen`}>
        <div className={`${showSidebar && 'bg-white'} flex-col gap-4 p-6`}>
          <Link to="/">
            <div onClick={resetLinkClick} className="text-md text-peachred/[0.85] hover:text-peachred font-bold">
              Dashboard
            </div>
          </Link>
          <ul onClick={onClick} className="font-raleway border-white flex flex-col border-l">
            {navLinks.map((links, index) => (
              <Link to={links.link} key={index}>
                <li onClick={() => handleLinkClick(links.name)} className={`${activeLink === links.name ? 'text-peachred border-l-2' : 'text-peachred/[.5]'} hover:text-peachred p-2 hover:border-l-2`}>
                  {links.name}
                </li>
              </Link>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
