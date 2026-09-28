import React, { useState } from "react";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { SidebarItem, NavItem } from "./SidebarItem";

interface SidebarProps {
     items: NavItem[];
}

export const Sidebar: React.FC<SidebarProps> = ({ items }) => {
     const [isCollapsed, setIsCollapsed] = useState(false);

     return (
          <aside
               className={`sidebar-container ${isCollapsed ? "w-20 px-2" : "w-64 px-4"}`}
          >
               <div className="flex flex-col gap-4">
                    <div
                         className={`sidebar-header ${isCollapsed ? "justify-center" : "justify-between"}`}
                    >
                         {!isCollapsed && (
                              <div className="flex items-center gap-3 overflow-hidden">

                                   <div className="w-8 h-8 rounded-full bg-[#F0CC00]/30 flex items-center justify-center shrink-0">
                                        <span className="text-[#275900] text-xl">✦</span>
                                   </div>


                                   <span className="font-bold text-xl tracking-wider text-slate-800 truncate">
                                        Momentum
                                   </span>

                              </div>
                         )}

                         <button
                              onClick={() => setIsCollapsed(!isCollapsed)}
                              className="p-1.5 rounded-lg text-slate-500 hover:bg-page-bg hover:text-accent-forest transition-colors shrink-0"
                              title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
                         >
                              {isCollapsed ? (
                                   <PanelLeftOpen className="w-5 h-5" />
                              ) : (
                                   <PanelLeftClose className="w-5 h-5" />
                              )}
                         </button>
                    </div>

                    <div className="h-px bg-slate-100 w-full" />

                    <nav className="flex flex-col gap-1 overflow-y-auto overflow-x-hidden">
                         {items.map((item) => (
                              <SidebarItem
                                   key={item.id}
                                   item={item}
                                   isCollapsed={isCollapsed}
                              />
                         ))}
                    </nav>
               </div>

               <div
                    className={`sidebar-profile ${isCollapsed ? "p-2 justify-center" : "p-3 gap-3"}`}
               >
                    <div className="w-8 h-8 rounded-lg bg-accent-forest text-white font-bold flex items-center justify-center shrink-0">
                         M
                    </div>

                    {!isCollapsed && (
                         <div className="flex flex-col truncate">
                              <span className="font-bold text-sm text-slate-800 truncate">
                                   Daily Tracker
                              </span>
                              <div className="flex items-center gap-1.5">
                                   <span className="w-2 h-2 rounded-full bg-accent-yellow" />
                                   <span className="text-xs font-medium text-accent-forest truncate">
                                        5 Days Active
                                   </span>
                              </div>
                         </div>
                    )}
               </div>
          </aside>
     );
};