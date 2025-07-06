import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  Search,
  Filter,
  MoreHorizontal,
  FilePenLine,
  FileCheck2,
  FileEdit,
  FileArchive,
} from "lucide-react";
import AppLayout from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SummaryCard from "@/components/dashboard/SummaryCard";
import { paginate } from "@/lib/utils";
import { useDeletePost, useUpdateBlogpost } from "@/services/mutations/blog";
import { useQuery } from "@tanstack/react-query";
import { fetchAllPosts, fetchBlogStats } from "@/services/blogServices";
import { toast } from "sonner";
import Delete from "@/components/ui/Delete";
import CategoriesDialog from "./blog-category";
import TablePagination from "@/components/ui/TablePagination";
import Confirm from "@/components/ui/confirm-dialog";

const BlogManager = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const [allPosts, setAllPosts] = useState<any[]>([]);
  const [selectedPost, setSelectedPost] = useState<any>(null);
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [deleteModal, setDeleteModal] = useState(false);
  const [stats, setStats] = useState<any>(null);
  // const [listView, setListView] = useState(true);

  const [statusConfirm, setStatusConfirm] = useState(false);

  const fetchBlogAnalytics = async () => {
    try {
      const response = await fetchBlogStats();
      setStats(response?.entity);
    } catch (error) {
      toast.error(error?.message || "Failed to fetch blog posts:");
    } finally {
      setIsLoading(false);
    }
  };

  const { data } = useQuery(
    ["ALL POSTS", page, itemsPerPage, searchQuery],
    fetchAllPosts,
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      // enabled: false,
      onSuccess: (data: any) => {
        fetchBlogAnalytics();
        setAllPosts(data?.entity?.items);
      },
      onError: (err: any) => {
        toast.error(err?.message || "Something went wrong");
      },
    },
  );

  const pagination = paginate(
    data?.entity?.meta?.totalItems || 0,
    Number(page),
    Number(itemsPerPage),
  );

  const { mutate, isLoading: deleting, reset, isSuccess } = useDeletePost();
  const {
    mutate: updateMutate,
    isLoading: updateLoading,
    isSuccess: updateSuccess,
  } = useUpdateBlogpost();

  useEffect(() => {
    if (isSuccess) {
      reset();
      setSelectedPost(null);
      setDeleteModal(false);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (updateSuccess) {
      reset();
      setSelectedPost(null);
      setStatusConfirm(false);
    }
  }, [updateSuccess]);

  const filteredPosts = allPosts.filter((post) => {
    const matchesSearch = post.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || post.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  if (isLoading) {
    return (
      <AppLayout>
        <div className="space-y-8 animate-pulse">
          <div className="h-8 bg-muted rounded w-64"></div>
          <div className="h-96 bg-muted rounded"></div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="space-y-16 py-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-display font-bold">Blog Manager</h1>
            <p className="text-muted-foreground mt-1">
              Create, edit, and manage your blog posts
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <CategoriesDialog />
            <Button
              onClick={() => navigate("/blog/new")}
              className="bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-600 hover:to-brand-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              New Blog Post
            </Button>
          </div>
        </div>

        {/* Performance Metrics */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <SummaryCard
              title="Total Posts"
              value={stats?.totalBlogs || `0`}
              icon={<FilePenLine className="h-10 w-10" />}
              description="total posts created"
              color="info"
            />
            <SummaryCard
              title="Published Posts"
              value={stats?.totalPublishedBlogs || `0`}
              icon={<FileCheck2 className="h-10 w-10" />}
              description="total published posts"
              color="success"
            />
            <SummaryCard
              title="Drafts"
              value={stats?.totalDraftBlogs || `0`}
              icon={<FileEdit className="h-10 w-10" />}
              description="posts waiting to be published"
              color="warning"
            />
            <SummaryCard
              title="Archived"
              value={stats?.totalArchivedBlogs || `0`}
              icon={<FileArchive className="h-10 w-10" />}
              description="total archived posts"
              color="default"
            />
          </div>
        )}

        {/* Filters */}
        <div className="flex items-center space-x-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search blog posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-48">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="published">Published</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Blog Posts Table */}
        <Card>
          <CardHeader>
            <CardTitle>Blog Posts</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Author</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Tags</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
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
                      <TableCell className="text-center">
                        <div className="h-8 bg-muted rounded w-8 mx-auto animate-pulse" />
                      </TableCell>
                    </TableRow>
                  ))
                ) : filteredPosts.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8">
                      <div className="text-muted-foreground">
                        {searchQuery || statusFilter !== "all"
                          ? "No blog posts match your filters"
                          : "No blog posts yet"}
                      </div>
                      {!searchQuery && statusFilter === "all" && (
                        <Button
                          variant="outline"
                          className="mt-4"
                          onClick={() => navigate("/blog/new")}
                        >
                          Create your first blog post
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredPosts.map((post) => (
                    <TableRow
                      key={post.id}
                      onClick={() => setSelectedPost(post)}
                    >
                      <TableCell>{post.title}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            post.status === "PUBLISHED"
                              ? "default"
                              : post.status === "DRAFT"
                                ? "secondary"
                                : "outline"
                          }
                        >
                          {post.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{post?.author?.name}</TableCell>
                      <TableCell>{post?.category?.name}</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {post?.tags?.slice(0, 2).map((tag, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="text-xs"
                            >
                              {tag}
                            </Badge>
                          ))}
                          {post?.tags?.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{post?.tags?.length - 2}
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => navigate(`/blog/${post?._id}`)}
                            >
                              <Eye className="h-4 w-4 mr-2" />
                              View
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => navigate(`/blog/${post?._id}/edit`)}
                            >
                              <Edit className="h-4 w-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => {
                                setSelectedPost(post);
                                setStatusConfirm(true);
                              }}
                            >
                              {post.status === "PUBLISHED" ? (
                                <FileArchive className="h-4 w-4 mr-2" />
                              ) : (
                                <FileCheck2 className="h-4 w-4 mr-2" />
                              )}
                              {post.status === "PUBLISHED"
                                ? "Archive"
                                : "Publish"}
                            </DropdownMenuItem>

                            <DropdownMenuItem
                              onClick={() => {
                                setDeleteModal(true);
                              }}
                              className="text-destructive"
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

            <div className="my-8">
              <TablePagination
                data={allPosts}
                page={page}
                pagination={pagination}
                setPage={setPage}
                setPageLimit={setItemsPerPage}
                pageLimit={itemsPerPage}
              />
            </div>
          </CardContent>
        </Card>
        {/* Delete Confirmation Dialog rendered outside the main dialog */}
      </div>

      <Delete
        show={deleteModal}
        onHide={() => setDeleteModal(false)}
        onProceed={() => mutate(selectedPost?._id)}
        isLoading={deleting}
        isLoadingText="Loading"
        okText="Yes, delete Post"
        size="md:w-[450px] w-[350px]"
        title={`Are you sure you want to delete "${selectedPost?.title}"?`}
        desc={`This action is irreversible.`}
      ></Delete>
      <Confirm
        show={statusConfirm}
        onHide={() => setStatusConfirm(false)}
        onProceed={() =>
          updateMutate({
            id: selectedPost?._id,
            payload: {
              status:
                selectedPost?.status === "PUBLISHED" ? "ARCHIVED" : "PUBLISHED",
            },
          })
        }
        isLoading={updateLoading}
        isLoadingText="Loading..."
        okText={
          selectedPost?.status === "PUBLISHED"
            ? "Yes, Archive Post"
            : "Yes, Publish Post"
        }
        size="md:w-[450px] w-[350px]"
        title={`${selectedPost?.status === "PUBLISHED" ? "Archive" : "Publish"} Post?`}
        desc={
          selectedPost?.status === "PUBLISHED"
            ? "This will remove the post from public view but keep it in your records."
            : "This will make the post publicly visible to everyone."
        }
      ></Confirm>
    </AppLayout>
  );
};

export default BlogManager;
