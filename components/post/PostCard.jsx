import dynamic from "next/dynamic";
import React, { useState } from "react";
import styles from "../../styles/post/PostCard.module.css";
import Link from "next/link";
import { domainName } from "../links/AwesomeLink.type";
import ContentFooter from "../comment/ContentFooter";
import toTimeString from "../../helpers/toTimeString";
import LightBoxGallery from "../images-manipulation/LightBoxGallery";
import EditLink from "../links/EditLink";
import { useRouter } from "next/router";
import { useTargetBlog } from "../../context/BlogProvider";
import Image from "next/image";
import Skeleton from "react-loading-skeleton";

const QuillContent = dynamic(() => import("../article/QuillContent"), {
  ssr: false,
});

export function PostCard({ pub, commentShown, logo, name, url }) {
  const router = useRouter();
  const { isOwner, blog } = useTargetBlog();

  const [showLightbox, setShowLightbox] = useState(false);
  const [currentImage, setCurrentImage] = useState(
    pub.thumbnails[0].downloadURL
  );

  return (
    <div className={styles.pub_items}>
      {isOwner && (
        <EditLink
          top={"0px"}
          right={"100px"}
          url={`/blogs/${router.query.blogId}/posts/publish?channel=${pub.id}`}
        />
      )}
      <div className={styles.pp}>
        {logo ? (
          <Image src={logo} width={50} height={50} className="skeleton" />
        ) : (
          <Skeleton width={50} height={50} baseColor={"grey"} circle />
        )}
      </div>
      <div className={styles.pub_wrapper}>
        <div className={styles.head}>
          <div className={styles.uinf}>
            {name && url ? (
              <Link href={url}>
                <a>{name}</a>
              </Link>
            ) : (
              <Skeleton
                width={150}
                height={10}
                baseColor={"grey"}
                borderRadius={10}
              />
            )}
          </div>
          <div>
            <span>{toTimeString(pub.createAt.seconds * 1000)}</span>
          </div>
        </div>
        <div className={styles.msg}>
          <QuillContent delta={JSON.parse(pub.content).ops} />
        </div>
        {showLightbox && pub.thumbnails && (
          <LightBoxGallery
            images={pub.thumbnails.map((file) => file.downloadURL)}
            activeImage={currentImage}
            closeLightBox={() => setShowLightbox(false)}
          />
        )}
        <div
          className={`${styles.gal}`}
          data-both={pub.thumbnails.length === 2}
          data-triple={pub.thumbnails.length === 3}
          data-multiple={pub.thumbnails.length > 3}
        >
          <div className={styles.items}>
            {pub.thumbnails.map((file) => (
              <img
                className="skeleton"
                key={file.fileName}
                src={file.downloadURL}
                onClick={() => {
                  setCurrentImage(file.downloadURL);
                  setShowLightbox(true);
                }}
              />
            ))}
          </div>
          {pub.thumbnails.length > 2 && (
            <div className={styles.gal_indicator}>
              {pub.thumbnails.map((file) => (
                <div key={file.fileName} className={styles.indicator} />
              ))}
            </div>
          )}
        </div>
        <ContentFooter pub={pub} commentShown={commentShown} blog={blog} />
      </div>
    </div>
  );
}
