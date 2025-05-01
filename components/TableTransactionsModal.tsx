import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import TableComponent from "./TableComponent";

export default function TableTransactionsModal({
  children,
  classes,
  onSuccess,
  data = [],
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className={classes}>{children}</Button>
      </DialogTrigger>

      <DialogContent className="md:min-w-[600px] lg:min-w-[800px] lg:ml-[50px] rounded-2xl ">
        <DialogHeader>
          <DialogTitle>All Transactions</DialogTitle>
        </DialogHeader>

        <TableComponent data={data} onSuccess={onSuccess} />
      </DialogContent>
    </Dialog>
  );
}
