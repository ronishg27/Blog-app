/* eslint-disable react/prop-types */
import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Input, Button, Select, RTE } from "../index";
import appwriteService from "../../appwrite/post.service";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// lecture 24

function PostForm({ post }) {
  const navigate = useNavigate();
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.slug || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });
  const userData = useSelector((state) => state.auth.userData);

  const submit = async (data) => {
    console.log("submit btn clicked");
    console.log(post);
    console.log(data);
    if (post) {
      const file = data.image[0]
        ? appwriteService.uploadFile(data.image[0])
        : null;
      console.log("file: ", file);
      if (file) {
        appwriteService.deleteFile(post.featuredImage);
      }
      const dbPost = await appwriteService.updatePost(post.$id, {
        ...data,
        featuredImage: file?.$id,
      });
      console.log("dbPost: ", dbPost);
      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
      }
    } else {
      const file = await appwriteService.uploadFile(data.image[0]);
      if (file) {
        const fileId = file.$id;
        data.featuredImage = fileId;
        const dbPost = await appwriteService.createPost({
          ...data,
          userId: userData.$id,
        });
        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
        }
      }
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return (
        value
          .trim()
          .toLowerCase()
          // .replace(/^[a-zA-Z\d\s]+/g, "-")
          .replace(/\s/g, "-")
      );
    return "";
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), {
          shouldValidate: true,
        });
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [watch, slugTransform, setValue]);

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
      <div className="w-2/3 px-2">
        <Input
          label="Title :"
          placeholder="Title"
          className="mb-4"
          {...register("title", { required: true })}
        />
        <Input
          label="Slug :"
          placeholder="Slug"
          className="mb-4"
          {...register("slug", { required: true })}
          onInput={(e) => {
            setValue("slug", slugTransform(e.currentTarget.value), {
              shouldValidate: true,
            });
          }}
        />
        <RTE
          label="Content :"
          name="content"
          control={control}
          defaultValue={getValues("content")}
        />
      </div>
      <div className="w-1/3 px-2">
        <Input
          label="Featured Image :"
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { required: !post })}
        />
        {post && (
          <div className="w-full mb-4">
            <img
              src={appwriteService.getFilePreview(post.featuredImage)}
              alt={post.title}
              className="rounded-lg"
            />
          </div>
        )}
        <Select
          options={["active", "inactive"]}
          label="Status"
          className="mb-4"
          {...register("status", { required: true })}
        />
        <Button
          type="submit"
          onClick={handleSubmit(submit)}
          bgColor={post ? "bg-green-500" : undefined}
          className="w-full"
        >
          {post ? "Update" : "Submit here"}
        </Button>
      </div>
    </form>
  );
}

export default PostForm;
