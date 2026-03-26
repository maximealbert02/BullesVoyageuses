export type TripStatus = 'planned' | 'in_progress' | 'completed' | 'cancelled';

export type StepType = 
  | 'morning' | 'afternoon' | 'evening' 
  | 'lunch' | 'dinner' | 'breakfast';

export interface Trip {

    id : number;
    name : string;
    description : string;
    start_date : string;
    end_date : string
    status : TripStatus;
    price : number;
    details : Record<string, any> | null;
    travellers?: number[];

}

export interface Booking {
    id : number;
    booking_date : string;
    user : number;
    trip : Trip;
    total_paid : number;
    remaining_balance : number;
    get_status : TripStatus;
}

export interface Payment {


}

export interface LinkedItem {

}

export interface Step {


}

export interface User {

}