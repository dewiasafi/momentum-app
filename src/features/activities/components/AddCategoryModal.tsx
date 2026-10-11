import React, { useState } from "react";
import { Button, Input, Modal } from "@/components/ui";
import { CategoryItem } from "./CategorySelector";
import { Sparkles } from "lucide-react";

interface AddCategoryModalProps {
  open: boolean;
  onClose: () => void;
  onAddCategory: (category: CategoryItem) => void;
}

export const AddCategoryModal: React.FC<AddCategoryModalProps> = ({
  open,
  onClose,
  onAddCategory,
}) => {
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    onAddCategory({
      id: name.trim().toLowerCase(),
      name: name.trim(),
      icon: <Sparkles className="w-5 h-5" />,
      bgClass: "bg-app-mint/20 text-app-leaf",
      iconColorClass: "text-app-leaf",
    });

    setName("");
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Add New Category"
      size="sm"
      footer={
        <div className="flex items-center justify-end gap-2.5">
          <Button variant="ghost" type="button" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" type="submit" form="add-category-form">
            Add Category
          </Button>
        </div>
      }
    >
      <form id="add-category-form" onSubmit={handleSubmit} className="space-y-4 py-2">
        <Input
          label="Category Name"
          placeholder="e.g. Wellness, Creative, Nutrition"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          fullWidth
        />
      </form>
    </Modal>
  );
};