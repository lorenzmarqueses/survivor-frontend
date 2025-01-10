import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FaPlusCircle } from "react-icons/fa";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "./ui/select";

const AddSurvivor: React.FC = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="border rounded-lg">
          <FaPlusCircle className="mr-2" />
          Add Survivor
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Survivor</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-4">
            <Label className="font-semibold" htmlFor="name">
              Full Name of Survivor
            </Label>
            <Input id="name" className="col-span-3" />
          </div>
          <div className="grid gap-4">
            <Label className="font-semibold" htmlFor="username">
              Status
            </Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Fruits</SelectLabel>
                  <SelectItem value="apple">Apple</SelectItem>
                  <SelectItem value="banana">Banana</SelectItem>
                  <SelectItem value="blueberry">Blueberry</SelectItem>
                  <SelectItem value="grapes">Grapes</SelectItem>
                  <SelectItem value="pineapple">Pineapple</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter className="grid grid-cols-2 gap-4">
          <Button variant="ghost">Cancel</Button>
          <Button className="bg-[#4D194D]" type="submit">
            Add Survivor
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddSurvivor;
