﻿// <auto-generated />
using MatthewFordUs.NextApp.WebApi.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage;
using Microsoft.EntityFrameworkCore.Storage.Internal;
using System;

namespace MatthewFordUs.NextApp.WebApi.Migrations
{
    [DbContext(typeof(SchoolDbContext))]
    [Migration("20171026001328_update1")]
    partial class update1
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.0.0-rtm-26452")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("MatthewFordUs.NextApp.Common.Class", b =>
                {
                    b.Property<Guid?>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("ClassNumber")
                        .IsRequired();

                    b.Property<Guid?>("ETag");

                    b.Property<DateTime>("EnteredTimestamp");

                    b.Property<DateTime>("SupersededTimestamp");

                    b.HasKey("Id");

                    b.ToTable("Classes");
                });

            modelBuilder.Entity("MatthewFordUs.NextApp.Common.Student", b =>
                {
                    b.Property<Guid?>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<Guid?>("ClassId");

                    b.Property<Guid?>("ETag");

                    b.Property<DateTime>("EnteredTimestamp");

                    b.Property<string>("GivenName");

                    b.Property<DateTime>("SupersededTimestamp");

                    b.Property<string>("Surname");

                    b.HasKey("Id");

                    b.HasIndex("ClassId");

                    b.ToTable("Students");
                });

            modelBuilder.Entity("MatthewFordUs.NextApp.Common.Student", b =>
                {
                    b.HasOne("MatthewFordUs.NextApp.Common.Class")
                        .WithMany("Students")
                        .HasForeignKey("ClassId");
                });
#pragma warning restore 612, 618
        }
    }
}
