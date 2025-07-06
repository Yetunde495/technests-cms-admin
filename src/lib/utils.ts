import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateUniqueId(): string {
    const timestamp: number = Date.now(); // Get the current timestamp in milliseconds
    const randomString: string = Math.random().toString(36).substr(2, 5); // Generate a random string
    return `${timestamp}-${randomString}`; // Combine the timestamp and random string to create the ID
  }

  export function paginate(totalItems: number, page: number, pageLimit: number) {
    const totalPages = Math.ceil(totalItems / pageLimit);
    const nextPage = page < totalPages ? page + 1 : null;
    const prevPage = page > 1 ? page - 1 : null;
  
    return {
      nextPage: nextPage || 0,
      prevPage: prevPage || 0,
      currentPage: page,
      pages: totalPages,
      total: totalItems,
    };
  }

  export function formatDateToString(timestamp:Date | string) {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');  // Months are zero-based
    const day = String(date.getDate()).padStart(2, '0');
  
    return `${year}-${month}-${day}`;
  }


  export function formatDateToString2(timestamp:Date | string | null) {
    const date = timestamp === null ? new Date : new Date(timestamp);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');  // Months are zero-based
    const day = String(date.getDate()).padStart(2, '0');
  
    return `${year}-${month}-${day}`;
  }
  

  // Reusable helper function to format dates
 export const formatDate = (dateString:string) => {
  const months = [
    "January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"
  ];

    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = months[date.getMonth()];
    // const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${day} ${month}, ${year}`;
  };