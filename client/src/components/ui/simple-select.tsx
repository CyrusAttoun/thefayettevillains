import React from 'react';

interface SelectProps {
  value: string;
  onValueChange: (value: string) => void;
  children: React.ReactNode;
}

interface SelectTriggerProps {
  children: React.ReactNode;
}

interface SelectContentProps {
  children: React.ReactNode;
}

interface SelectItemProps {
  value: string;
  children: React.ReactNode;
}

interface SelectValueProps {
  placeholder?: string;
}

export const Select: React.FC<SelectProps> = ({ value, onValueChange, children }) => {
  return (
    <div style={{ position: 'relative' }}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child) && child.type === SelectTrigger) {
          return React.cloneElement(child as React.ReactElement<any>, { value, onValueChange });
        }
        return child;
      })}
    </div>
  );
};

export const SelectTrigger: React.FC<SelectTriggerProps & { value?: string; onValueChange?: (value: string) => void }> = ({ 
  children, 
  value, 
  onValueChange 
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  
  const selectRef = React.useRef<HTMLDivElement>(null);
  
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  const handleSelect = (newValue: string) => {
    onValueChange?.(newValue);
    setIsOpen(false);
  };
  
  return (
    <div ref={selectRef} style={{ position: 'relative' }}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        style={{
          display: 'flex',
          height: '2.5rem',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderRadius: '0.375rem',
          border: '1px solid #d1d5db',
          backgroundColor: 'white',
          padding: '0.5rem 0.75rem',
          fontSize: '0.875rem',
          cursor: 'pointer'
        }}
      >
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child) && child.type === SelectValue) {
            const props = child.props as SelectValueProps;
            return <span>{value || props.placeholder || 'Select...'}</span>;
          }
          return child;
        })}
        <svg style={{ height: '1rem', width: '1rem', opacity: 0.5 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      {isOpen && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          zIndex: 50,
          marginTop: '0.25rem',
          maxHeight: '24rem',
          overflow: 'auto',
          borderRadius: '0.375rem',
          border: '1px solid #d1d5db',
          backgroundColor: 'white',
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
          padding: '0.25rem'
        }}>
          {React.Children.map(children, (child) => {
            if (React.isValidElement(child) && child.type === SelectContent) {
              const childProps = child.props as { children: React.ReactNode };
              return React.Children.map(childProps.children, (item) => {
                if (React.isValidElement(item) && item.type === SelectItem) {
                  return React.cloneElement(item as React.ReactElement<any>, { onSelect: handleSelect });
                }
                return item;
              });
            }
            return null;
          })}
        </div>
      )}
    </div>
  );
};

export const SelectContent: React.FC<SelectContentProps> = ({ children }) => {
  return <>{children}</>;
};

export const SelectItem: React.FC<SelectItemProps & { onSelect?: (value: string) => void }> = ({ 
  value, 
  children, 
  onSelect 
}) => {
  return (
    <button
      type="button"
      onClick={() => onSelect?.(value)}
      style={{
        display: 'flex',
        width: '100%',
        cursor: 'pointer',
        alignItems: 'center',
        borderRadius: '0.25rem',
        padding: '0.375rem 0.5rem',
        fontSize: '0.875rem',
        outline: 'none',
        border: 'none',
        backgroundColor: 'transparent',
        textAlign: 'left'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = '#f3f4f6';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = 'transparent';
      }}
    >
      {children}
    </button>
  );
};

export const SelectValue: React.FC<SelectValueProps> = () => {
  return null; // This is just a placeholder
};