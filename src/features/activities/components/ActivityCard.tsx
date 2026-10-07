import { convertDateFormat, formatViewDate } from '@/utils/formatters';
import React, { useMemo, useState } from 'react'
import { Activity, ActivityPriority } from '../types';
import { useActivities } from '../api/useActivities';
import { Badge, Button, Card, Select } from '@/components/ui';
import { AlertCircle, Calendar, CheckCircle2, ChevronLeft, ChevronRight, Circle, Clock, Filter, Search, X } from 'lucide-react';

const ActivityCard = () => {
     const [searchInput, setSearchInput] = useState<string>('');
     const [confirmedSearch, setConfirmedSearch] = useState<string>('');

     const [selectedCategory, setSelectedCategory] = useState<string>('All');
     const [statusFilter, setStatusFilter] = useState<string>('All');
     const [dateFilter, setDateFilter] = useState<string>('');
     const [currentPage, setCurrentPage] = useState<number>(1);

     const activityParams = useMemo(() => {
          return {
               page: currentPage,
               limit: 5,
               search: confirmedSearch || undefined,
               category: selectedCategory === 'All' ? undefined : selectedCategory,
               is_completed: statusFilter === 'All' ? undefined : statusFilter === 'Completed',
               start_date: dateFilter ? convertDateFormat(dateFilter) : undefined,
               end_date: dateFilter ? convertDateFormat(dateFilter) : undefined
          }
     }, [currentPage, searchInput, selectedCategory, statusFilter, dateFilter]);

     const { data: apiResponse, isLoading, isError, error } = useActivities(activityParams);
     const paginatedData = apiResponse?.data;
     const activityItems = paginatedData?.items || [];
     const totalPages = paginatedData?.total_items || 1;

     const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
          if (e.key === 'Enter') {
               e.preventDefault();
               setConfirmedSearch(searchInput);
               setCurrentPage(1);
          }
     };

     const handleClearSearch = () => {
          setSearchInput('');
          setConfirmedSearch('');
          setCurrentPage(1);
     };
     const getPriorityVariant = (priority: ActivityPriority) => {
          if (priority === 'high') return 'leaf';
          if (priority === 'medium') return 'sunshine';
          return 'sage';
     };

     const getCategoryVariant = (category: string) => {
          switch (category) {
               case 'Work': return 'seafoam';
               case 'Learning': return 'eucalyptus';
               case 'Household': return 'moss';
               default: return 'neutral';
          }
     };

     return (
          <Card
               title="Today's Activities"
               className="w-full flex flex-col"
               extra={
                    <Badge variant="primary" size="md" dot>
                         {activityItems.length} Shown
                    </Badge>
               }
               actions={[
                    <Button
                         key="prev"
                         variant="ghost"
                         size="sm"
                         disabled={currentPage === 1 || isLoading}
                         onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                         leftIcon={<ChevronLeft />}
                    >
                         Previous
                    </Button>,
                    <span key="info" className="text-xs font-semibold text-app-subtext">
                         {isLoading ? "Loading..." : `Page ${currentPage} of ${totalPages}`}
                    </span>,
                    <Button
                         key="next"
                         variant="ghost"
                         size="sm"
                         disabled={currentPage === totalPages || isLoading}
                         onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                         rightIcon={<ChevronRight />}
                    >
                         Next
                    </Button>
               ]}
          >
               {/* LINE 1: SEARCH BAR FILTER */}
               <div className="relative mb-4">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-app-subtext">
                         <Search />
                    </span>
                    <input
                         type="text"
                         value={searchInput} // Mengikat input lokal secara real-time
                         onChange={(e) => setSearchInput(e.target.value)}
                         onKeyDown={handleKeyDown} // Kunci Utama: Hanya jalankan query jika ditekan Enter
                         placeholder="Type query and press Enter to search..."
                         className="w-full pl-9 pr-12 py-2 text-sm bg-app-bg/30 border border-app-subtext/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-app-eucalyptus focus:bg-white transition-all text-app-body placeholder-app-subtext/50"
                    />
                    {searchInput && (
                         <button
                              onClick={handleClearSearch}
                              className="absolute inset-y-0 right-0 pr-3 flex items-center text-app-subtext hover:text-app-title transition-colors cursor-pointer"
                         >
                              <X className="w-3.5 h-3.5" />
                         </button>
                    )}
               </div>

               {/* LINE 2: THREE-COLUMN DROPDOWNS MULTI-FILTER GRID */}
               <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
                    <Select
                         label="Category"
                         value={selectedCategory}
                         onChange={(e) => { setSelectedCategory(e.target.value); setCurrentPage(1); }}
                         options={[
                              { label: 'All Categories', value: 'All' },
                              { label: 'Work', value: 'Work' },
                              { label: 'Learning', value: 'Learning' },
                              { label: 'Household', value: 'Household' },
                              { label: 'General', value: 'General' },
                         ]}
                    />

                    <Select
                         label="Status"
                         value={statusFilter}
                         onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}
                         options={[
                              { label: 'All Status', value: 'All' },
                              { label: 'Active Tasks', value: 'Uncompleted' },
                              { label: 'Completed', value: 'Completed' },
                         ]}
                    />

                    {/* <div className="flex flex-col gap-y-1.5">
          <label className="font-semibold text-app-title text-sm select-none">Date</label>
          <input 
            type="date" 
            value={dateFilter}
            onChange={(e) => { setDateFilter(e.target.value); setCurrentPage(1); }}
            className="w-full text-sm px-3.5 py-1.5 border border-app-subtext/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-app-eucalyptus/20 focus:border-app-eucalyptus text-app-body bg-white"
          />
        </div> */}
               </div>

               {/* LINE 3: DYNAMIC DATA RENDERING LIST */}
               <div className="space-y-3 h-full overflow-y-auto pr-1">
                    {isLoading ? (
                         <div className="text-center py-12 text-sm text-app-subtext font-medium animate-pulse">
                              Fetching fresh data from your server API...
                         </div>
                    ) : isError ? (
                         <div className="text-center py-12 border border-red-100 rounded-xl bg-red-50/30 text-rose-600 flex flex-col items-center gap-2 px-4">
                              <AlertCircle className="w-5 h-5" />
                              <p className="text-xs font-semibold">Failed to pull activities: {(error as Error)?.message || "Server Error"}</p>
                         </div>
                    ) : activityItems.length > 0 ? (
                         activityItems.map((item: Activity) => (
                              <div
                                   key={item.id}
                                   className={`flex items-start gap-3 p-4 rounded-xl border transition-all duration-200 ${item.is_completed
                                        ? 'bg-app-bg/20 border-app-subtext/10 opacity-60'
                                        : 'bg-white border-app-subtext/10 shadow-xs hover:border-app-subtext/30'
                                        }`}
                              >
                                   {/* Checkbox Icon Indicator (Read-Only) */}
                                   <div className={`mt-0.5 shrink-0 ${item.is_completed ? 'text-emerald-600' : 'text-app-subtext'}`}>
                                        {item.is_completed ? <CheckCircle2 /> : <Circle />}
                                   </div>

                                   {/* Core Content Area */}
                                   <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                                             <Badge variant={getCategoryVariant(item.category)} size="sm">
                                                  {item.category}
                                             </Badge>
                                             <Badge variant={getPriorityVariant(item.priority)} size="sm" dot>
                                                  {item.priority}
                                             </Badge>
                                             <span className="text-[10px] text-app-subtext font-medium ml-auto flex items-center gap-1">
                                                  <Calendar /> {formatViewDate(item.created_at)}
                                             </span>
                                        </div>

                                        <h3 className={`text-sm font-semibold transition-all ${item.is_completed ? 'line-through text-app-disabled' : 'text-app-body'
                                             }`}>
                                             {item.title}
                                        </h3>

                                        {item.notes && (
                                             <p className="text-xs text-app-subtext mt-1 line-clamp-2 leading-relaxed">
                                                  {item.notes}
                                             </p>
                                        )}
                                   </div>

                                   {/* Estimated Minute Marker */}
                                   <span className="text-[10px] bg-slate-50 text-app-subtext border border-slate-100 px-2 py-0.5 rounded-md font-medium shrink-0 flex items-center gap-1.5">
                                        <Clock /> {item.estimated_minutes}m
                                   </span>
                              </div>
                         ))
                    ) : (
                         <div className="text-center py-12 border border-dashed border-app-subtext/20 rounded-xl bg-app-bg/10 flex flex-col items-center justify-center gap-2">
                              <Filter className="text-app-subtext opacity-40 w-5 h-5" />
                              <p className="text-sm text-app-subtext font-medium">No tasks found matching your filters.</p>
                         </div>
                    )}
               </div>
          </Card>

     )
}

export default ActivityCard