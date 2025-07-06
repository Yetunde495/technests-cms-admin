import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Tags,
  Plus,
  Edit,
  Trash2,
  MoreHorizontal,
  Search,
  CheckCircle2,
} from "lucide-react";
import {
  createBlogCategory,
  deleteBlogCategory,
  fetchBlogCategories,
  updateBlogCategory,
} from "@/services/blogServices";
import { formatDate } from "@/lib/utils";

interface Category {
  _id: string;
  createdAt: string;
  name: string;
  description: string;
  isActive?: boolean;
  postCount?: number;
}

interface CategoryFormData {
  name: string;
  description: string;
  postCount?: number;
}

const CategoriesDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [deletingCategory, setDeletingCategory] = useState<Category | null>(
    null,
  );
  const [showForm, setShowForm] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CategoryFormData>({
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const watchedName = watch("name");

  useEffect(() => {
    if (isOpen) {
      loadCategories();
    }
  }, [isOpen]);

  const loadCategories = async () => {
    setIsLoading(true);
    try {
      const response = await fetchBlogCategories();
      // setCategories(response.data);
      setCategories(response?.entity);
    } catch (error) {
      console.error("Failed to load categories:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  const onSubmit = async (data: CategoryFormData) => {
    setIsLoading(true);

    try {
      if (editingCategory) {
        // Update existing category

        const updateResp = await updateBlogCategory(editingCategory._id, {
          name: data.name,
          description: data.description,
        });

        setCategories((prev) =>
          prev.map((cat) =>
            cat._id === editingCategory._id
              ? updateResp?.entity
              : {
                  ...editingCategory,
                  name: data.name,
                  description: data.description,
                },
          ),
        );
      } else {
        // Create new category
        const newCategory: CategoryFormData = {
          name: data.name,
          description: data.description,
          postCount: 0,
        };
        const created = await createBlogCategory(newCategory);
        setCategories((prev) => [
          ...prev,
          created?.entity || {
            ...newCategory,
            _id: Date.now().toString(),
            createdAt: new Date().toISOString(),
          },
        ]);
      }

      resetForm();
    } catch (error) {
      console.error("Failed to save category:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    setValue("name", category.name);
    setValue("description", category.description);
    setShowForm(true);
  };

  const handleDelete = async () => {
    if (!deletingCategory) return;

    setIsLoading(true);
    try {
      await deleteBlogCategory(deletingCategory._id);
      setCategories((prev) =>
        prev.filter((cat) => cat._id !== deletingCategory._id),
      );
      setDeletingCategory(null);
    } catch (error) {
      console.error("Failed to delete category:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    reset();
    setEditingCategory(null);
    setShowForm(false);
  };

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  // const colorOptions = [
  //   "#8b5cf6", // Purple
  //   "#059669", // Green
  //   "#dc2626", // Red
  //   "#2563eb", // Blue
  //   "#ea580c", // Orange
  //   "#7c3aed", // Violet
  //   "#0891b2", // Cyan
  //   "#be123c", // Rose
  //   "#a21caf", // Fuchsia
  //   "#059669", // Emerald
  // ];

  return (
    <>
      {/* Main Dialog */}
      <Dialog
        open={isOpen}
        onOpenChange={(open) => {
          if (deletingCategory) return;
          setIsOpen(open);
        }}
      >
        <DialogTrigger asChild>
          <Button variant="outline" className="space-x-2">
            <Tags className="h-4 w-4" />
            <span>Manage Categories</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <Tags className="h-5 w-5" />
              <span>Blog Categories</span>
              <Badge variant="secondary" className="ml-2">
                {categories.length} categories
              </Badge>
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            {/* Action Bar */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search categories..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 w-64"
                  />
                </div>
              </div>
              <Button
                onClick={() => setShowForm(true)}
                className="bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-600 hover:to-brand-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Category
              </Button>
            </div>
            {/* Add/Edit Form */}
            {showForm && (
              <div className="border rounded-lg p-6 bg-muted/20">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">
                    {editingCategory ? "Edit Category" : "Add New Category"}
                  </h3>
                  <Button variant="ghost" size="sm" onClick={resetForm}>
                    Cancel
                  </Button>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <Label htmlFor="name">Category Name</Label>
                      <Input
                        id="name"
                        placeholder="Enter category name"
                        {...register("name", {
                          required: "Category name is required",
                        })}
                        className="mt-1"
                      />
                      {errors.name && (
                        <p className="text-sm text-destructive mt-1">
                          {errors.name.message}
                        </p>
                      )}
                      {watchedName && (
                        <p className="text-xs text-muted-foreground mt-1">
                          Slug: {generateSlug(watchedName)}
                        </p>
                      )}
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Brief description of this category"
                      rows={3}
                      {...register("description")}
                      className="mt-1"
                    />
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button type="button" variant="outline" onClick={resetForm}>
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-600 hover:to-brand-700"
                    >
                      {isLoading ? (
                        <>Saving...</>
                      ) : editingCategory ? (
                        <>
                          <CheckCircle2 className="h-4 w-4 mr-2" />
                          Update Category
                        </>
                      ) : (
                        <>
                          <Plus className="h-4 w-4 mr-2" />
                          Create Category
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </div>
            )}
            {/* Categories Table */}
            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Category</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead className="text-center">Post Count</TableHead>
                    <TableHead className="text-center">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    Array.from({ length: 3 }).map((_, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <div className="w-4 h-4 bg-muted rounded animate-pulse" />
                            <div className="h-4 bg-muted rounded w-24 animate-pulse" />
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="h-4 bg-muted rounded w-48 animate-pulse" />
                        </TableCell>
                        <TableCell className="text-center">
                          <div className="h-4 bg-muted rounded w-8 mx-auto animate-pulse" />
                        </TableCell>
                        <TableCell className="text-center">
                          <div className="h-4 bg-muted rounded w-16 mx-auto animate-pulse" />
                        </TableCell>
                        <TableCell className="text-center">
                          <div className="h-8 bg-muted rounded w-8 mx-auto animate-pulse" />
                        </TableCell>
                      </TableRow>
                    ))
                  ) : filteredCategories.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-8">
                        <div className="text-muted-foreground">
                          {searchQuery
                            ? "No categories match your search"
                            : "No categories yet"}
                        </div>
                        {!searchQuery && (
                          <Button
                            variant="outline"
                            className="mt-4"
                            onClick={() => setShowForm(true)}
                          >
                            Create your first category
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredCategories.map((category) => (
                      <TableRow key={category._id}>
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <div className="w-4 h-4 rounded bg-brand-600" />
                            <div>
                              <div className="font-medium">{category.name}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="max-w-md">
                            <p className="text-sm line-clamp-2">
                              {category.description || "No description"}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="max-w-md">
                            <p className="text-sm line-clamp-2">
                              {category?.postCount || 0}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell className="text-center">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                onClick={() => {
                                  handleEdit(category);
                                }}
                              >
                                <Edit className="h-4 w-4 mr-2" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => setDeletingCategory(category)}
                                className="text-destructive"
                                disabled={category?.postCount > 0}
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog rendered outside the main dialog */}
      {deletingCategory && (
        <AlertDialog
          open={!!deletingCategory}
          onOpenChange={(open) => {
            if (!open) setDeletingCategory(null);
          }}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Category</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete the category "
                {deletingCategory?.name}"? This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDelete}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                Delete Category
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </>
  );
};

export default CategoriesDialog;
