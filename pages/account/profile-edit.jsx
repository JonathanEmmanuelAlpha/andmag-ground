import React, { useState } from "react";
import SkeletonLayout from "../../components/skeleton-layout/SkeletonLayout";
import PersonnalComponent from "../../components/edit-components/PersonnalComponent";
import InfosComponent from "../../components/edit-components/InfosComponent";
import PPComponent from "../../components/edit-components/PPComponent";
import { useAuth } from "../../context/AuthProvider";
import styles from "../../styles/account/edit.module.css";
import Image from "next/image";

export default function ProfileEdit() {
  const { currentUser } = useAuth();

  return (
    <SkeletonLayout
      title="Andmag ground - profile"
      description="Update your account information such as the profile picture and the nickname."
      robots={"noindex,nofollow"}
    >
      <div className={styles.container}>
        <PersonnalComponent />
        <InfosComponent />
        <div className={styles.user_images} id="profile-picture">
          {currentUser && currentUser.photoURL && (
            <div className={styles.banner_pp}>
              <div className={styles.pp}>
                <Image
                  className="skeleton"
                  src={currentUser.photoURL}
                  alt="profile picture"
                  width={150}
                  height={150}
                  priority
                />
              </div>
            </div>
          )}
          <div className={styles.banner_pp_edit}>
            <PPComponent ppReady={(url) => setPhotoURL(url)} />
          </div>
        </div>
      </div>
    </SkeletonLayout>
  );
}
