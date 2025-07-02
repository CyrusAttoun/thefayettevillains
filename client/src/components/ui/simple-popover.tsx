import React from 'react';

interface PopoverProps {
  children: React.ReactNode;
}

interface PopoverTriggerProps {
  asChild?: boolean;
  children: React.ReactNode;
}

interface PopoverContentProps {
  children: React.ReactNode;
  align?: 'start' | 'center' | 'end';
  style?: React.CSSProperties;
}

const PopoverContext = React.createContext<{
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}>({
  isOpen: false,
  setIsOpen: () => {}
});

export const Popover: React.FC<PopoverProps> = ({ children }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  
  return (
    <PopoverContext.Provider value={{ isOpen, setIsOpen }}>
      <div style={{ position: 'relative' }}>
        {children}
      </div>
    </PopoverContext.Provider>
  );
};

export const PopoverTrigger: React.FC<PopoverTriggerProps> = ({ asChild, children }) => {
  const { isOpen, setIsOpen } = React.useContext(PopoverContext);
  
  if (asChild && React.isValidElement(children)) {
    const childProps = children.props as Record<string, any>;
    return React.cloneElement(children as React.ReactElement<any>, {
      ...childProps,
      onClick: () => setIsOpen(!isOpen)
    });
  }
  
  return (
    <button onClick={() => setIsOpen(!isOpen)}>
      {children}
    </button>
  );
};

export const PopoverContent: React.FC<PopoverContentProps> = ({ children, align = 'center', style }) => {
  const { isOpen, setIsOpen } = React.useContext(PopoverContext);
  const contentRef = React.useRef<HTMLDivElement>(null);
  
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (contentRef.current && !contentRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, setIsOpen]);
  
  if (!isOpen) {
    return null;
  }
  
  const alignmentStyle = {
    start: { left: 0 },
    center: { left: '50%', transform: 'translateX(-50%)' },
    end: { right: 0 }
  }[align];
  
  return (
    <div
      ref={contentRef}
      style={{
        position: 'absolute',
        top: '100%',
        zIndex: 50,
        marginTop: '0.25rem',
        borderRadius: '0.375rem',
        border: '1px solid #d1d5db',
        backgroundColor: 'white',
        padding: '1rem',
        color: '#111827',
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
        outline: 'none',
        ...alignmentStyle,
        ...style
      }}
    >
      {children}
    </div>
  );
};