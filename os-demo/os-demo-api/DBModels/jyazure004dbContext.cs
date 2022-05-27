using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

#nullable disable

namespace os_demo_api.DBModels
{
    public partial class jyazure004dbContext : DbContext
    {
        public jyazure004dbContext()
        {
        }

        public jyazure004dbContext(DbContextOptions<jyazure004dbContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Dlr> Dlrs { get; set; }
        public virtual DbSet<Ind> Inds { get; set; }
        public virtual DbSet<Leg> Legs { get; set; }
        public virtual DbSet<LuDlrClass> LuDlrClasses { get; set; }
        public virtual DbSet<LuDlrOpStatu> LuDlrOpStatus { get; set; }
        public virtual DbSet<LuDlrOpStatusReason> LuDlrOpStatusReasons { get; set; }
        public virtual DbSet<LuDlrType> LuDlrTypes { get; set; }
        public virtual DbSet<LuLegType> LuLegTypes { get; set; }
        public virtual DbSet<LuPartyRltnBranch> LuPartyRltnBranches { get; set; }
        public virtual DbSet<LuPartyRltnRole> LuPartyRltnRoles { get; set; }
        public virtual DbSet<LuPartyRltnRoleCat> LuPartyRltnRoleCats { get; set; }
        public virtual DbSet<LuRegExpiydate> LuRegExpiydates { get; set; }
        public virtual DbSet<LuRegStatu> LuRegStatus { get; set; }
        public virtual DbSet<PartyRltn> PartyRltns { get; set; }
        public virtual DbSet<TestDataSet> TestDataSets { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer("Name=jyAzure004DB");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Dlr>(entity =>
            {
                entity.HasKey(e => e.PartyId);

                entity.ToTable("Dlr");

                entity.Property(e => e.DlrClassId)
                    .IsRequired()
                    .HasMaxLength(6)
                    .IsUnicode(false);

                entity.Property(e => e.DlrName)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.DlrOpStatusId)
                    .HasMaxLength(6)
                    .IsUnicode(false);

                entity.Property(e => e.DlrOpStatusReasonId)
                    .HasMaxLength(6)
                    .IsUnicode(false);

                entity.Property(e => e.DlrTypeId)
                    .HasMaxLength(6)
                    .IsUnicode(false);

                entity.Property(e => e.Email)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.EwhideFlag).HasColumnName("EWHideFlag");

                entity.Property(e => e.RegExpiydateId)
                    .HasMaxLength(6)
                    .IsUnicode(false);

                entity.Property(e => e.RegStatusId)
                    .HasMaxLength(6)
                    .IsUnicode(false);

                entity.Property(e => e.Tc).HasColumnName("TC");

                entity.HasOne(d => d.DlrClass)
                    .WithMany(p => p.Dlrs)
                    .HasForeignKey(d => d.DlrClassId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Dlr_LuDlrClass");

                entity.HasOne(d => d.DlrOpStatus)
                    .WithMany(p => p.Dlrs)
                    .HasForeignKey(d => d.DlrOpStatusId)
                    .HasConstraintName("FK_Dlr_LuDlrOpStatus");

                entity.HasOne(d => d.DlrOpStatusReason)
                    .WithMany(p => p.Dlrs)
                    .HasForeignKey(d => d.DlrOpStatusReasonId)
                    .HasConstraintName("FK_Dlr_LuDlrOpStatusReason");

                entity.HasOne(d => d.DlrType)
                    .WithMany(p => p.Dlrs)
                    .HasForeignKey(d => d.DlrTypeId)
                    .HasConstraintName("FK_Dlr_LuDlrType");

                entity.HasOne(d => d.TestDataSet)
                    .WithMany(p => p.Dlrs)
                    .HasForeignKey(d => d.TestDataSetId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Dlr_TestDataSet");
            });

            modelBuilder.Entity<Ind>(entity =>
            {
                entity.HasKey(e => e.PartyId);

                entity.ToTable("Ind");

                entity.Property(e => e.BirthDate).HasColumnType("date");

                entity.Property(e => e.CertDate).HasColumnType("date");

                entity.Property(e => e.CertRequireDate).HasColumnType("date");

                entity.Property(e => e.Email)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.FirstName)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Gender)
                    .HasMaxLength(1)
                    .IsUnicode(false)
                    .IsFixedLength(true);

                entity.Property(e => e.LastName)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.RegExpiydateId)
                    .HasMaxLength(6)
                    .IsUnicode(false);

                entity.Property(e => e.RegStatusId)
                    .HasMaxLength(6)
                    .IsUnicode(false);

                entity.Property(e => e.StudentId)
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.Tc).HasColumnName("TC");

                entity.HasOne(d => d.TestDataSet)
                    .WithMany(p => p.Inds)
                    .HasForeignKey(d => d.TestDataSetId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Ind_TestDataSet");
            });

            modelBuilder.Entity<Leg>(entity =>
            {
                entity.HasKey(e => e.PartyId);

                entity.ToTable("Leg");

                entity.Property(e => e.LegName)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.LegTypeId)
                    .HasMaxLength(6)
                    .IsUnicode(false)
                    .HasColumnName("LegTypeID");

                entity.HasOne(d => d.LegType)
                    .WithMany(p => p.Legs)
                    .HasForeignKey(d => d.LegTypeId)
                    .HasConstraintName("FK_Leg_LuLegTypeId");

                entity.HasOne(d => d.TestDataSet)
                    .WithMany(p => p.Legs)
                    .HasForeignKey(d => d.TestDataSetId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Leg_TestDataSet");
            });

            modelBuilder.Entity<LuDlrClass>(entity =>
            {
                entity.HasKey(e => e.DlrClassId)
                    .HasName("PK__luDlrCla__81755B54FCD13A34");

                entity.ToTable("luDlrClass");

                entity.Property(e => e.DlrClassId)
                    .HasMaxLength(6)
                    .IsUnicode(false)
                    .HasColumnName("DlrClassID");

                entity.Property(e => e.Description)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<LuDlrOpStatu>(entity =>
            {
                entity.HasKey(e => e.DlrOpStatusId)
                    .HasName("PK__luDlrOpS__91925A0F20A877A7");

                entity.ToTable("luDlrOpStatus");

                entity.Property(e => e.DlrOpStatusId)
                    .HasMaxLength(6)
                    .IsUnicode(false)
                    .HasColumnName("DlrOpStatusID");

                entity.Property(e => e.Description)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<LuDlrOpStatusReason>(entity =>
            {
                entity.HasKey(e => e.DlrOpStatusReasonId)
                    .HasName("PK__luDlrOpS__A0AE4ABE1C9FDF0E");

                entity.ToTable("luDlrOpStatusReason");

                entity.Property(e => e.DlrOpStatusReasonId)
                    .HasMaxLength(6)
                    .IsUnicode(false)
                    .HasColumnName("DlrOpStatusReasonID");

                entity.Property(e => e.Description)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<LuDlrType>(entity =>
            {
                entity.HasKey(e => e.DlrTypeId)
                    .HasName("PK__luDlrTyp__B4D7A08D9B081A74");

                entity.ToTable("luDlrType");

                entity.Property(e => e.DlrTypeId)
                    .HasMaxLength(6)
                    .IsUnicode(false)
                    .HasColumnName("DlrTypeID");

                entity.Property(e => e.Description)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.DlrClassIds)
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("DlrClassIDs");
            });

            modelBuilder.Entity<LuLegType>(entity =>
            {
                entity.HasKey(e => e.LegTypeId)
                    .HasName("PK__luLegTyp__CC330225C36F672B");

                entity.ToTable("luLegType");

                entity.Property(e => e.LegTypeId)
                    .HasMaxLength(6)
                    .IsUnicode(false)
                    .HasColumnName("LegTypeID");

                entity.Property(e => e.Description)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<LuPartyRltnBranch>(entity =>
            {
                entity.HasKey(e => e.PartyRltnBranchId)
                    .HasName("PK_luDlrBranch");

                entity.ToTable("luPartyRltnBranch");

                entity.Property(e => e.PartyRltnBranchId)
                    .HasMaxLength(1)
                    .IsUnicode(false)
                    .HasColumnName("PartyRltnBranchID")
                    .IsFixedLength(true);

                entity.Property(e => e.Description)
                    .IsRequired()
                    .HasMaxLength(50);
            });

            modelBuilder.Entity<LuPartyRltnRole>(entity =>
            {
                entity.HasKey(e => e.PartyRltnRoleId)
                    .HasName("PK__luPartyR__D830245CC5222B1B");

                entity.ToTable("luPartyRltnRole");

                entity.Property(e => e.PartyRltnRoleId)
                    .HasMaxLength(6)
                    .IsUnicode(false)
                    .HasColumnName("PartyRltnRoleID");

                entity.Property(e => e.Description)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.PartyRltnRoleCatId)
                    .IsRequired()
                    .HasMaxLength(2)
                    .IsUnicode(false)
                    .HasColumnName("PartyRltnRoleCatID")
                    .IsFixedLength(true);
            });

            modelBuilder.Entity<LuPartyRltnRoleCat>(entity =>
            {
                entity.HasKey(e => e.PartyRltnRoleCatId)
                    .HasName("PK__luPartyR__B9B2161675F856BF");

                entity.ToTable("luPartyRltnRoleCat");

                entity.Property(e => e.PartyRltnRoleCatId)
                    .HasMaxLength(2)
                    .IsUnicode(false)
                    .HasColumnName("PartyRltnRoleCatID")
                    .IsFixedLength(true);

                entity.Property(e => e.Description)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<LuRegExpiydate>(entity =>
            {
                entity.HasKey(e => e.RegExpiydateId)
                    .HasName("PK__luRegExp__DC06EC2A7DF11F2F");

                entity.ToTable("luRegExpiydate");

                entity.Property(e => e.RegExpiydateId)
                    .HasMaxLength(6)
                    .IsUnicode(false);

                entity.Property(e => e.Description)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<LuRegStatu>(entity =>
            {
                entity.HasKey(e => e.RegStatusId)
                    .HasName("PK__luRegSta__290718D9A8DAB2DB");

                entity.ToTable("luRegStatus");

                entity.Property(e => e.RegStatusId)
                    .HasMaxLength(6)
                    .IsUnicode(false);

                entity.Property(e => e.Description)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<PartyRltn>(entity =>
            {
                entity.ToTable("PartyRltn");

                entity.Property(e => e.PartyRltnId).HasColumnName("PartyRltnID");

                entity.Property(e => e.IndPartyId).HasColumnName("IndPartyID");

                entity.Property(e => e.LegPartyId).HasColumnName("LegPartyID");

                entity.Property(e => e.PartyRltnBranchId)
                    .HasMaxLength(1)
                    .IsUnicode(false)
                    .HasColumnName("PartyRltnBranchID")
                    .IsFixedLength(true);

                entity.Property(e => e.PartyRltnRoleId)
                    .IsRequired()
                    .HasMaxLength(6)
                    .IsUnicode(false)
                    .HasColumnName("PartyRltnRoleID");

                entity.HasOne(d => d.PartyRltnBranch)
                    .WithMany(p => p.PartyRltns)
                    .HasForeignKey(d => d.PartyRltnBranchId)
                    .HasConstraintName("FK_PartyRltn_luPartyRltnBranch");

                entity.HasOne(d => d.PartyRltnRole)
                    .WithMany(p => p.PartyRltns)
                    .HasForeignKey(d => d.PartyRltnRoleId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_PartyRltn_PartyRltnRole");
            });

            modelBuilder.Entity<TestDataSet>(entity =>
            {
                entity.ToTable("TestDataSet");

                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Tester)
                    .HasMaxLength(100)
                    .IsUnicode(false);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
