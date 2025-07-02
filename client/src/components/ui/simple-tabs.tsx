import React from 'react';

interface TabsProps {
  value: string;
  onValueChange: (value: string) => void;
  children: React.ReactNode;
  style?: React.CSSProperties;
}

interface TabsListProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
}

interface TabsTriggerProps {
  value: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
}

interface TabsContentProps {
  value: string;
  children: React.ReactNode;
}

const TabsContext = React.createContext<{
  activeTab: string;
  setActiveTab: (value: string) => void;
}>({
  activeTab: '',
  setActiveTab: () => {}
});

export const Tabs: React.FC<TabsProps> = ({ value, onValueChange, children, style }) => {
  return (
    <TabsContext.Provider value={{ activeTab: value, setActiveTab: onValueChange }}>
      <div style={style}>
        {children}
      </div>
    </TabsContext.Provider>
  );
};

export const TabsList: React.FC<TabsListProps> = ({ children, style }) => {
  return (
    <div style={{
      display: 'inline-flex',
      height: '2.5rem',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '0.375rem',
      backgroundColor: '#f3f4f6',
      padding: '0.25rem',
      color: '#6b7280',
      ...style
    }}>
      {children}
    </div>
  );
};

export const TabsTrigger: React.FC<TabsTriggerProps> = ({ value, children, style }) => {
  const { activeTab, setActiveTab } = React.useContext(TabsContext);
  const isActive = activeTab === value;
  
  return (
    <button
      type="button"
      onClick={() => setActiveTab(value)}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        whiteSpace: 'nowrap',
        borderRadius: '0.25rem',
        padding: '0.375rem 0.75rem',
        fontSize: '0.875rem',
        fontWeight: '500',
        transition: 'all 0.2s',
        cursor: 'pointer',
        border: 'none',
        backgroundColor: isActive ? 'white' : 'transparent',
        color: isActive ? '#111827' : '#6b7280',
        boxShadow: isActive ? '0 1px 2px 0 rgba(0, 0, 0, 0.05)' : 'none',
        ...style
      }}
    >
      {children}
    </button>
  );
};

export const TabsContent: React.FC<TabsContentProps> = ({ value, children }) => {
  const { activeTab } = React.useContext(TabsContext);
  
  if (activeTab !== value) {
    return null;
  }
  
  return (
    <div style={{ marginTop: '0.5rem' }}>
      {children}
    </div>
  );
};