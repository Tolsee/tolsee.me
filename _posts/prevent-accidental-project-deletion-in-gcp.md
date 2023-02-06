---
title: "Prevent accidental project deletion in GCP with liens"
date: "2023-02-06"
author: "Tulsi Sapkota"
tags:
  - GCP
  - Liens
  - Terraform
---

In Google Cloud Platform (GCP), project is where we have all the resources like
VMs, Kubernetes Clusters, Buckets etc. To prevent from accidental deletion of
important project like production, we can use resource-manager liens.

### Requirements

| Permissions                                                                                                                      | Description             |
| -------------------------------------------------------------------------------------------------------------------------------- | ----------------------- |
| `resourcemanager.projects.updateLiens`                                                                                           | Place lien in a project |
| `resourcemanager.organizations.get` <br> `resourcemanager.projects.create` <br> (Or `roles/resourcemanager.projectCreator` role) | Create project          |

### Terraform code

```hcl
resource "google_project" "project" {
  project_id = "abc-prod"
  name       = "Production project for abc software"
}

resource "google_resource_manager_lien" "lien" {
  parent       = "projects/${google_project.project.number}"
  restrictions = ["resourcemanager.projects.delete"] # It provide restriction against deletion
  origin       = "project-lien-terraform"
  reason       = "Production environment of abc"
}
```
