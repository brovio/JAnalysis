import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { useStore } from '../../store/useStore';

interface StaffFilterProps {
  selectedStaff: string;
  onStaffChange: (event: SelectChangeEvent) => void;
}

export default function StaffFilter({
  selectedStaff,
  onStaffChange
}: StaffFilterProps) {
  const entries = useStore(state => state.entries);

  const staffCounts = entries.reduce((acc, entry) => {
    if (entry.fullName) {
      acc[entry.fullName] = (acc[entry.fullName] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);

  const staffMembers = [...new Set(entries.map(entry => entry.fullName))]
    .filter(Boolean)
    .sort()
    .map(staff => ({
      name: staff,
      count: staffCounts[staff]
    }));

  return (
    <FormControl fullWidth size="small">
      <InputLabel>Staff Member</InputLabel>
      <Select
        value={selectedStaff}
        label="Staff Member"
        onChange={onStaffChange}
      >
        <MenuItem value="all">All Staff</MenuItem>
        {staffMembers.map(({ name, count }) => (
          <MenuItem key={name} value={name}>
            {name} ({count})
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}