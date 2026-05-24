import React, { useEffect, useState, useRef } from 'react';
import { useHylian } from './HylianContext';

const TopBar = () => {
  const { theme, setTheme, availableColors, mapOrgToColor, getOrgColor } = useHylian();
  const [orgs, setOrgs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeOrg, setActiveOrg] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalOrg, setModalOrg] = useState(null);

  const dropdownRef = useRef(null);
  const modalRef = useRef(null);

  useEffect(() => {
    fetch('http://localhost:3030/api/orgs')
      .then(res => res.json())
      .then(data => {
        if (data.status === 0 && data.result) {
          const allOrgs = [
            ...(data.result.nonScratchOrgs || []),
            ...(data.result.scratchOrgs || [])
          ];
          setOrgs(allOrgs);
          if (allOrgs.length > 0) {
            const firstActive = allOrgs.find(o => o.connectedStatus !== 'Expired');
            setActiveOrg(firstActive ? firstActive.username : '');
          }
        }
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  // Click outside and ESC handling
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsModalOpen(false);
      }
    };

    const handleEsc = (event) => {
      if (event.key === 'Escape') {
        setIsDropdownOpen(false);
        setIsModalOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEsc);
    };
  }, []);

  const handleSelectOrg = (org) => {
    if (org.connectedStatus === 'Expired') return;
    setActiveOrg(org.username);
    setIsDropdownOpen(false);
  };

  const openColorModal = (e, orgId) => {
    e.stopPropagation(); // Prevent closing dropdown
    setModalOrg(orgId);
    setIsModalOpen(true);
    setIsDropdownOpen(false); // Optionally close dropdown when opening modal
  };

  const activeColor = getOrgColor(activeOrg);

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0.5rem 1rem',
      backgroundColor: 'var(--card-bg)',
      borderBottom: '1px solid var(--border-color)',
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div style={{ position: 'relative' }} ref={dropdownRef}>
          <button 
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: 'var(--bg-color)',
              color: activeColor,
              border: `1px solid ${activeColor}`,
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: 'bold',
              minWidth: '280px',
              textAlign: 'left',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            {loading ? 'Loading...' : activeOrg || 'Select Org'} 
            <span>▼</span>
          </button>

          {isDropdownOpen && (
            <div style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              marginTop: '0.25rem',
              backgroundColor: 'var(--card-bg)',
              border: '1px solid var(--border-color)',
              borderRadius: '4px',
              boxShadow: '0 4px 6px rgba(0,0,0,0.3)',
              width: '400px',
              maxHeight: '400px',
              overflowY: 'auto',
              zIndex: 150
            }}>
              {orgs.map((org, i) => {
                const orgId = org.username;
                const isExpired = org.connectedStatus === 'Expired';
                const orgMappedColor = getOrgColor(orgId);

                return (
                  <div 
                    key={i}
                    onClick={() => handleSelectOrg(org)}
                    style={{
                      padding: '0.5rem 1rem',
                      cursor: isExpired ? 'not-allowed' : 'pointer',
                      opacity: isExpired ? 0.6 : 1,
                      backgroundColor: isExpired ? 'rgba(255,0,0,0.1)' : 'transparent',
                      color: isExpired ? 'var(--palette-red)' : 'var(--text-color)',
                      borderBottom: '1px solid var(--border-color)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem'
                    }}
                  >
                    {/* Gear Icon for Color Picker (only if not expired) on the Left */}
                    {!isExpired ? (
                      <span 
                        onClick={(e) => openColorModal(e, orgId)}
                        style={{ 
                          cursor: 'pointer', 
                          padding: '0.3rem', 
                          fontSize: '1.2rem',
                          borderRadius: '50%',
                          color: orgMappedColor
                        }}
                        title="Map Color"
                      >
                        ⚙️
                      </span>
                    ) : (
                      <span style={{ width: '1.2rem', padding: '0.3rem' }}>⚠️</span>
                    )}

                    <div style={{ flex: 1, overflow: 'hidden' }}>
                      <div style={{ fontWeight: 'bold', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                        {orgId}
                      </div>
                      <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>
                        {org.alias ? `Alias: ${org.alias}` : 'No Alias'} {isExpired && '(Re-auth)'}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Right side: Theme Switcher */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <span style={{ fontSize: '1.2rem' }} title="Theme">🎨</span>
        <select 
          value={theme} 
          onChange={(e) => setTheme(e.target.value)} 
          style={{ 
            padding: '0.25rem', 
            borderRadius: '4px', 
            border: 'none', 
            backgroundColor: 'transparent', 
            color: 'var(--text-color)',
            cursor: 'pointer',
            fontWeight: 'bold',
            outline: 'none'
          }}
        >
          <option value="gruvbox">Gruvbox</option>
          <option value="everforest">Everforest</option>
          <option value="catppuccin">Catppuccin</option>
          <option value="nord">Nord</option>
        </select>
      </div>

      {/* Color Picker Modal */}
      {isModalOpen && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 200
        }}>
          <div ref={modalRef} style={{
            backgroundColor: 'var(--card-bg)',
            padding: '1.5rem',
            borderRadius: '8px',
            border: '1px solid var(--border-color)',
            width: '300px',
            position: 'relative'
          }}>
            <button 
              onClick={() => setIsModalOpen(false)}
              style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                background: 'transparent',
                border: 'none',
                color: 'var(--text-color)',
                fontSize: '1.2rem',
                cursor: 'pointer'
              }}
            >
              ✕
            </button>
            <h3 style={{ margin: '0 0 1rem 0' }}>Pick Color for {modalOrg}</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', alignItems: 'center' }}>
              <input 
                type="color" 
                defaultValue="#ffffff"
                onChange={(e) => mapOrgToColor(modalOrg, e.target.value)}
                style={{
                  width: '100%',
                  height: '50px',
                  cursor: 'pointer',
                  border: 'none',
                  padding: 0
                }}
              />
              <button 
                onClick={() => { mapOrgToColor(modalOrg, ''); setIsModalOpen(false); }}
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  backgroundColor: 'var(--secondary-color)',
                  color: 'var(--bg-color)',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontWeight: 'bold'
                }}
              >
                Reset to Default Theme Color
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default TopBar;
