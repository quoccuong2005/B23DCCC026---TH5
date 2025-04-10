declare namespace Club {
  interface Record {
    id: number;
    avatar: string; // có thể là URL hoặc base64 string
    name: string;
    established: string;
    description: string;
    president: string;
    active: boolean;
  }
  
  interface Member {
    id: number;
    fullName: string;
    email: string;
    phone: string;
    gender: string;
    address: string;
    strengths: string;
    clubId: number;
  }

  interface Props {
    visible: boolean;
    onCancel: () => void;
    record?: Club.Record;
    isEdit: boolean;
  }

  interface Props {
    visible: boolean;
    onCancel: () => void;
    members: Club.Member[];
  }
}