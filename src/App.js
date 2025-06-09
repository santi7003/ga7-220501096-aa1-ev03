import React, { useState, useEffect } from 'react';

const FloatingIcon = ({ icon, delay = 0 }) => {
    const [position, setPosition] = useState({
        left: Math.random() * 100,
        animationDelay: delay
    });

    useEffect(() => {
        const timer = setTimeout(() => {
            setPosition(prev => ({
                ...prev,
                left: Math.random() * 100
            }));
        }, 15000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div
            className="floating-element"
            style={{
                left: `${position.left}%`,
                animationDelay: `${position.animationDelay}s`,
                position: 'absolute',
                opacity: 0.1,
                fontSize: '2rem',
                animation: 'float 15s infinite linear'
            }}
        >
            {icon}
        </div>
    );
};

const CommandTag = ({ command }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <span
            className="command-tag"
            style={{
                display: 'inline-block',
                background: isHovered ? '#667eea' : 'rgba(102, 126, 234, 0.2)',
                color: isHovered ? 'white' : '#667eea',
                padding: '4px 8px',
                borderRadius: '4px',
                fontFamily: 'Courier New, monospace',
                fontSize: '0.9em',
                margin: '2px',
                transition: 'all 0.3s ease',
                transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
                cursor: 'pointer'
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
      {command}
    </span>
    );
};

const TableRow = ({ feature, icon, local, remote, localCommands, remoteCommands, index }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, index * 100);

        return () => clearTimeout(timer);
    }, [index]);

    return (
        <tr
            style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateX(0)' : 'translateX(-50px)',
                transition: 'all 0.6s ease'
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <td style={{
                padding: '18px 15px',
                borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
                fontWeight: 600,
                background: 'linear-gradient(135deg, #667eea, #764ba2)',
                color: 'white',
                transition: 'all 0.3s ease',
                transform: isHovered ? 'scale(1.02)' : 'scale(1)'
            }}>
                {icon} {feature}
            </td>
            <td style={{
                padding: '18px 15px',
                borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
                background: isHovered ? 'rgba(102, 126, 234, 0.1)' : 'linear-gradient(135deg, rgba(255, 154, 158, 0.1), rgba(254, 207, 239, 0.1))',
                borderLeft: '4px solid #ff9a9e',
                transition: 'all 0.3s ease',
                transform: isHovered ? 'scale(1.02)' : 'scale(1)'
            }}>
                {localCommands ? (
                    <div>
                        {localCommands.map((cmd, i) => (
                            <CommandTag key={i} command={cmd} />
                        ))}
                    </div>
                ) : (
                    <span dangerouslySetInnerHTML={{ __html: local }} />
                )}
            </td>
            <td style={{
                padding: '18px 15px',
                borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
                background: isHovered ? 'rgba(102, 126, 234, 0.1)' : 'linear-gradient(135deg, rgba(168, 237, 234, 0.1), rgba(254, 214, 227, 0.1))',
                borderLeft: '4px solid #a8edea',
                transition: 'all 0.3s ease',
                transform: isHovered ? 'scale(1.02)' : 'scale(1)'
            }}>
                {remoteCommands ? (
                    <div>
                        {remoteCommands.map((cmd, i) => (
                            <CommandTag key={i} command={cmd} />
                        ))}
                    </div>
                ) : (
                    <span dangerouslySetInnerHTML={{ __html: remote }} />
                )}
            </td>
        </tr>
    );
};

function App() {
    const [floatingIcons, setFloatingIcons] = useState([]);

    useEffect(() => {
        const icons = ['💻', '🌐', '⚡', '🔒', '🚀', '📊', '🔄', '👥'];
        const initialIcons = icons.map((icon, index) => ({
            id: index,
            icon,
            delay: index * 2
        }));
        setFloatingIcons(initialIcons);

        const interval = setInterval(() => {
            const newIcon = {
                id: Date.now(),
                icon: icons[Math.floor(Math.random() * icons.length)],
                delay: 0
            };
            setFloatingIcons(prev => [...prev.slice(-7), newIcon]);
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    const tableData = [
        {
            feature: 'Ubicación',
            icon: '📍',
            local: 'En la <span style="position: relative; display: inline-block; border-bottom: 2px solid transparent; transition: border-color 0.3s ease;">máquina local</span> del desarrollador',
            remote: 'En un <span style="position: relative; display: inline-block; border-bottom: 2px solid transparent; transition: border-color 0.3s ease;">servidor remoto</span> (GitHub, GitLab, Bitbucket)'
        },
        {
            feature: 'Acceso',
            icon: '🔐',
            local: 'Solo accesible desde el <span style="position: relative; display: inline-block; border-bottom: 2px solid transparent; transition: border-color 0.3s ease;">equipo del usuario</span>',
            remote: 'Accesible desde <span style="position: relative; display: inline-block; border-bottom: 2px solid transparent; transition: border-color 0.3s ease;">cualquier lugar</span> con conexión'
        },
        {
            feature: 'Velocidad',
            icon: '⚡',
            local: '<span style="position: relative; display: inline-block; border-bottom: 2px solid transparent; transition: border-color 0.3s ease;">Rápido</span> (no necesita conexión a internet)',
            remote: '<span style="position: relative; display: inline-block; border-bottom: 2px solid transparent; transition: border-color 0.3s ease;">Más lento</span> (depende de la red)'
        },
        {
            feature: 'Privacidad',
            icon: '🔒',
            local: '<span style="position: relative; display: inline-block; border-bottom: 2px solid transparent; transition: border-color 0.3s ease;">Datos privados</span> del usuario',
            remote: 'Puede ser <span style="position: relative; display: inline-block; border-bottom: 2px solid transparent; transition: border-color 0.3s ease;">público o privado</span> según configuración'
        },
        {
            feature: 'Sincronización',
            icon: '🔄',
            local: '<span style="position: relative; display: inline-block; border-bottom: 2px solid transparent; transition: border-color 0.3s ease;">No requiere conexión</span> para trabajar',
            remote: 'Necesita <span style="position: relative; display: inline-block; border-bottom: 2px solid transparent; transition: border-color 0.3s ease;">push y pull</span> para sincronizar cambios'
        },
        {
            feature: 'Seguridad',
            icon: '🛡️',
            local: '<span style="position: relative; display: inline-block; border-bottom: 2px solid transparent; transition: border-color 0.3s ease;">Vulnerable</span> si el equipo falla o se pierde',
            remote: '<span style="position: relative; display: inline-block; border-bottom: 2px solid transparent; transition: border-color 0.3s ease;">Más seguro</span> si se hacen copias en la nube'
        },
        {
            feature: 'Colaboración',
            icon: '👥',
            local: '<span style="position: relative; display: inline-block; border-bottom: 2px solid transparent; transition: border-color 0.3s ease;">Limitada</span> (solo el desarrollador accede)',
            remote: 'Permite <span style="position: relative; display: inline-block; border-bottom: 2px solid transparent; transition: border-color 0.3s ease;">trabajo colaborativo</span> entre múltiples usuarios'
        },
        {
            feature: 'Uso principal',
            icon: '🎯',
            local: '<span style="position: relative; display: inline-block; border-bottom: 2px solid transparent; transition: border-color 0.3s ease;">Desarrollo y pruebas</span> locales',
            remote: '<span style="position: relative; display: inline-block; border-bottom: 2px solid transparent; transition: border-color 0.3s ease;">Compartir, respaldar y colaborar</span> en el proyecto'
        },
        {
            feature: 'Comandos comunes',
            icon: '⌨️',
            localCommands: ['git add', 'git commit', 'git status'],
            remoteCommands: ['git push', 'git pull', 'git fetch', 'git clone']
        },
        {
            feature: 'Dependencia de red',
            icon: '🌐',
            local: '<span style="position: relative; display: inline-block; border-bottom: 2px solid transparent; transition: border-color 0.3s ease;">No depende</span> de internet',
            remote: '<span style="position: relative; display: inline-block; border-bottom: 2px solid transparent; transition: border-color 0.3s ease;">Requiere conexión</span> a internet'
        }
    ];

    return (
        <div style={{
            fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            minHeight: '100vh',
            padding: '20px',
            animation: 'gradientShift 10s ease infinite',
            position: 'relative'
        }}>
            <style>{`
        @keyframes gradientShift {
          0%, 100% { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }
          50% { background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); }
        }
        @keyframes gradientText {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-10px); }
          60% { transform: translateY(-5px); }
        }
        @keyframes float {
          0% { transform: translateY(100vh) rotate(0deg); }
          100% { transform: translateY(-100px) rotate(360deg); }
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(50px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

            {/* Floating Elements */}
            <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                zIndex: -1
            }}>
                {floatingIcons.map((item) => (
                    <FloatingIcon key={item.id} icon={item.icon} delay={item.delay} />
                ))}
            </div>

            {/* Main Container */}
            <div style={{
                maxWidth: '1200px',
                margin: '0 auto',
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(20px)',
                borderRadius: '20px',
                padding: '30px',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                animation: 'slideIn 0.8s ease-out'
            }}>
                {/* Header */}
                <div style={{textAlign: 'center', marginBottom: '40px'}}>
                    <h1 style={{
                        fontSize: '3rem',
                        fontWeight: 700,
                        background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1)',
                        backgroundSize: '200% 200%',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        animation: 'gradientText 3s ease infinite',
                        marginBottom: '10px'
                    }}>
                        Git Local vs Git Remoto
                    </h1>
                    <p style={{
                        color: 'rgba(255, 255, 255, 0.8)',
                        fontSize: '1.2rem',
                        fontWeight: 300,
                        marginBottom: '10px'
                    }}>
                        Comparación completa de características y funcionalidades
                    </p>
                    <p style={{
                        color: 'rgba(255, 255, 255, 0.9)',
                        fontSize: '1rem',
                        fontWeight: 500,
                        background: 'rgba(255, 255, 255, 0.1)',
                        padding: '10px 20px',
                        borderRadius: '15px',
                        display: 'inline-block',
                        marginBottom: '20px'
                    }}>
                        👨‍💻 Santiago Espinosa

                    </p>
                    <br/>
                    <p style={{
                        color: 'rgba(255, 255, 255, 0.9)',
                        fontSize: '1rem',
                        fontWeight: 500,
                        background: 'rgba(255, 255, 255, 0.1)',
                        padding: '10px 20px',
                        borderRadius: '15px',
                        display: 'inline-block',
                        marginBottom: '20px'
                    }}>
                        Tecnología En Análisis Y Desarrollo De Software

                    </p>
                    <br/>
                    <p style={{
                        color: 'rgba(255, 255, 255, 0.9)',
                        fontSize: '1rem',
                        fontWeight: 500,
                        background: 'rgba(255, 255, 255, 0.1)',
                        padding: '10px 20px',
                        borderRadius: '15px',
                        display: 'inline-block',
                        marginBottom: '20px'
                    }}>
                        Ficha :(2885525)

                    </p>

                    {/* Git Icons */}
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        gap: '30px',
                        margin: '30px 0'
                    }}>
                        <div style={{
                            width: '60px',
                            height: '60px',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '2rem',
                            background: 'linear-gradient(45deg, #ff9a9e, #fecfef)',
                            animation: 'bounce 2s infinite'
                        }}>
                            💻
                        </div>
                        <div style={{
                            color: 'white',
                            fontSize: '2rem',
                            alignSelf: 'center'
                        }}>
                            ⚡
                        </div>
                        <div style={{
                            width: '60px',
                            height: '60px',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '2rem',
                            background: 'linear-gradient(45deg, #a8edea, #fed6e3)',
                            animation: 'bounce 2s infinite',
                            animationDelay: '0.5s'
                        }}>
                            🌐
                        </div>
                    </div>
                </div>

                {/* Table */}
                <div style={{
                    overflow: 'hidden',
                    borderRadius: '15px',
                    boxShadow: '0 15px 35px rgba(0, 0, 0, 0.1)'
                }}>
                    <table style={{
                        width: '100%',
                        borderCollapse: 'collapse',
                        background: 'rgba(255, 255, 255, 0.95)',
                        fontSize: '1rem'
                    }}>
                        <thead>
                        <tr>
                            <th style={{
                                background: 'linear-gradient(135deg, #667eea, #764ba2)',
                                color: 'white',
                                padding: '20px 15px',
                                fontWeight: 600,
                                textAlign: 'left'
                            }}>
                                Característica
                            </th>
                            <th style={{
                                background: 'linear-gradient(135deg, #ff9a9e, #fecfef)',
                                color: 'white',
                                padding: '20px 15px',
                                fontWeight: 600,
                                textAlign: 'left'
                            }}>
                                Git Local
                            </th>
                            <th style={{
                                background: 'linear-gradient(135deg, #a8edea, #fed6e3)',
                                color: 'white',
                                padding: '20px 15px',
                                fontWeight: 600,
                                textAlign: 'left'
                            }}>
                                Git Remoto
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {tableData.map((row, index) => (
                            <TableRow
                                key={index}
                                index={index}
                                feature={row.feature}
                                icon={row.icon}
                                local={row.local}
                                remote={row.remote}
                                localCommands={row.localCommands}
                                remoteCommands={row.remoteCommands}
                            />
                        ))}
                        </tbody>
                    </table>
                </div>

                {/* Footer */}
                <div style={{
                    textAlign: 'center',
                    marginTop: '30px',
                    color: 'rgba(255, 255, 255, 0.8)',
                    fontSize: '0.9rem'
                }}>
                    <p>
                        Creado con santiago espinosa
                    </p>
                </div>
            </div>
        </div>
    );
}

export default App;
